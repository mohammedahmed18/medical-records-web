import { useSubscription } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { getMessagesWithOtherUser, MessageResponse } from '@/api/messaging';
import Spinner from '@/components/common/spinner';
import UserProfileImage from '@/components/common/UserProfileImage';
import LongText from '@/components/LongText';
import Messages from '@/components/messaging/Messages';
import SendMessageInput from '@/components/messaging/SendMessageInput';
import { ROOM_MESSAGES } from '@/constant/queryKeys';
import { RECIEVE_MESSAGE } from '@/graphql/messages';

import StethoScopeIcon from '~/svg/stethoscope-icon.svg';

const ChatView = () => {
  const router = useRouter();
  const { u: otherUserId } = router.query;
  const queryCache = useQueryClient();

  const {
    data,
    refetch: fetcMessages,
    status,
  } = useQuery(
    [ROOM_MESSAGES, otherUserId],
    () => getMessagesWithOtherUser(otherUserId?.toString()),
    { enabled: false, keepPreviousData: false }
  );

  const addMyMessageToTheUi = (messageText: string, isTheSenderMe = false) => {
    const updater = (cacheValue: MessageResponse | undefined) => {
      const previousMessages = cacheValue?.messages || [];
      return {
        isPrivateChat: cacheValue?.isPrivateChat || false,
        otherUser: cacheValue?.otherUser,
        messages: [
          ...previousMessages,
          {
            value: messageText.trim(),
            type: 'text',
            isMe: isTheSenderMe,
            createdAt: new Date(),
          },
        ],
      };
    };

    queryCache.setQueryData([ROOM_MESSAGES, otherUserId], updater);
  };

  useSubscription(RECIEVE_MESSAGE, {
    onData: ({ data }) => {
      const recievedMessage = data.data.messageSent;
      addMyMessageToTheUi(recievedMessage?.value);
    },
  });

  useEffect(() => {
    if (!otherUserId) return;
    fetcMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherUserId]);

  const { otherUser, messages, isPrivateChat } = data
    ? data
    : { messages: [], otherUser: null, isPrivateChat: false };

  const isLoading = status === 'loading';
  const noChatIsSelected = status === 'idle';

  if (noChatIsSelected) {
    return <h1>Start chatting with others</h1>;
  }

  if (isLoading) {
    return (
      <div className='center-content h-full'>
        {/* TODO: show loadin , maybe create this with figma */}
        <Spinner size={50} />
      </div>
    );
  }
  return (
    <>
      {/* other user info */}
      <div className='flex items-center gap-4 py-4 px-5 shadow-lg'>
        {/* image */}
        <UserProfileImage rounded src={otherUser?.image_src} size={50} />

        {/* name and medical specialization */}
        {otherUser && (
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <LongText
                text={otherUser.name}
                maxChars={50}
                className='text-3xl'
              />
              {isPrivateChat && (
                <span className='mx-4 rounded-lg bg-primary-200 px-2 text-lg text-white'>
                  Message yourself
                </span>
              )}
            </div>
            {otherUser.medicalSpecialization && (
              <div className='flex items-center gap-3 fill-gray-500 text-2xl text-gray-500'>
                <StethoScopeIcon />
                <span>{otherUser.medicalSpecialization}</span>
              </div>
            )}
          </div>
        )}
      </div>
      {isPrivateChat && (
        <div className='bg-base-300 py-4 px-3 text-2xl leading-relaxed shadow-lg'>
          This is your space. Draft messages, make to-do lists or keep links to
          hand. You can also talk to yourself here, but please bear in mind
          you'll have to provide both sides of the conversation.
        </div>
      )}
      <Messages messages={messages} />

      <SendMessageInput addMyMessageToTheUi={addMyMessageToTheUi} />
    </>
  );
};

export default ChatView;
