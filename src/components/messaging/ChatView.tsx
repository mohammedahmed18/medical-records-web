import { useSubscription } from '@apollo/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { getMessagesWithOtherUser, MessageResponse } from '@/api/messaging';
import { RoomItemType } from '@/api/messaging';
import { PublicUserInfo } from '@/api/users';
import Spinner from '@/components/common/spinner';
import UserProfileImage from '@/components/common/UserProfileImage';
import LongText from '@/components/LongText';
import Messages from '@/components/messaging/Messages';
import SendMessageInput from '@/components/messaging/SendMessageInput';
import { GET_MY_ROOMS, ROOM_MESSAGES } from '@/constant/queryKeys';
import { RECIEVE_MESSAGE } from '@/graphql/messages';

import StethoScopeIcon from '~/svg/stethoscope-icon.svg';

const ChatView = () => {
  const router = useRouter();
  const { u: otherUserIdQuery } = router.query;
  const queryCache = useQueryClient();

  const {
    data,
    refetch: fetcMessages,
    status,
  } = useQuery(
    [ROOM_MESSAGES, otherUserIdQuery],
    () => getMessagesWithOtherUser(otherUserIdQuery?.toString()),
    { enabled: false, retry: false }
  );

  const addMyMessageToTheUi = (
    messageText: string,
    otherUser?: PublicUserInfo | null,
    isTheSenderMe = false
  ) => {
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

    // update the room list
    if (otherUser) {
      //
      const roomsUpdater = (cachedRooms: RoomItemType[] | undefined) => {
        if (!cachedRooms) return [];
        //check if the room already exist in the cached rooms list
        const index = cachedRooms.findIndex(
          (r) => r.otherUser.id === otherUser.id
        );
        const newRoomList = [...cachedRooms];
        const existingRoom = newRoomList[index];

        const addedRoom: RoomItemType = {
          ...existingRoom,
          otherUser,
          lastMessage: {
            type: 'text',
            value: messageText,
            isMe: isTheSenderMe,
            createdAt: moment().fromNow(),
          },
        };
        if (index !== -1) {
          // room exist
          newRoomList.splice(index, 1);

          // Insert the element at the beginning of the array
          newRoomList.unshift(addedRoom);
          return newRoomList;
        } else {
          //room doesn't exist
          return [addedRoom, ...newRoomList];
        }
      };
      queryCache.setQueryData([GET_MY_ROOMS], roomsUpdater);
    }

    queryCache.setQueryData([ROOM_MESSAGES, otherUser?.id], updater);
  };

  useSubscription(RECIEVE_MESSAGE, {
    onData: ({ data }) => {
      const recievedMessage = data.data.messageSent;
      addMyMessageToTheUi(
        recievedMessage?.value,
        {
          ...recievedMessage.sentUser,
        },
        isPrivateChat ? true : false
      );
    },
  });

  useEffect(() => {
    if (!otherUserIdQuery) return;
    const cached = queryCache.getQueryData([ROOM_MESSAGES, otherUserIdQuery]);
    !cached && fetcMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherUserIdQuery]);

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

      <SendMessageInput
        addMyMessageToTheUi={(v, b) => addMyMessageToTheUi(v, otherUser, b)}
      />
    </>
  );
};

export default ChatView;
