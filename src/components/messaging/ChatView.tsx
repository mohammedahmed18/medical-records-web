import { useMutation, useSubscription } from '@apollo/client';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { getMessagesWithOtherUser, MessageResponse } from '@/api/messaging';
import { RoomItemType } from '@/api/messaging';
import { PublicUserInfo } from '@/api/users';
import Spinner from '@/components/common/spinner';
import UserProfileImage from '@/components/common/UserProfileImage';
import LongText from '@/components/LongText';
import Messages from '@/components/messaging/Messages';
import RecordsModal from '@/components/messaging/RecordsModal';
import SendMessageInput from '@/components/messaging/SendMessageInput';
import { GET_MY_ROOMS, ROOM_MESSAGES } from '@/constant/queryKeys';
import { RECIEVE_MESSAGE, SEND_MESSAGE } from '@/graphql/messages';

import { MedicalRecord } from '@/types/medicalRecords';

import StethoScopeIcon from '~/svg/stethoscope-icon.svg';

const ChatView = () => {
  const router = useRouter();
  const [showRecordsModal, setShowRecordsModal] = useState(false);
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

  const handleCloseRecordsModal = () => {
    setShowRecordsModal(false);
  };

  const handleOpenRecordsModal = () => {
    setShowRecordsModal(true);
  };
  const addMyMessageToTheUi = (
    messageText: string,
    type: 'text' | 'image' | 'medicalRecord' = 'text',
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
            type,
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
            type,
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

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    // onCompleted: (data) => {
    //   const { sendMessage: newMessageInTheDb } = data;
    // },
  });

  const handleSendMedicalRecord = (record: MedicalRecord) => {
    //
    const {
      // exclude these from the message
      doctorId: _d,
      createdAt: _c,
      updatedAt: _u,
      ...rest
    } = record;
    const medicalRecordString = JSON.stringify(rest);
    const type = 'medicalRecord';
    sendMessage({
      variables: {
        value: medicalRecordString,
        type,
        toId: data?.otherUser?.id,
      },
    });
    addMyMessageToTheUi(medicalRecordString, type, data?.otherUser, true);
  };

  useSubscription(RECIEVE_MESSAGE, {
    onData: ({ data: recievedMessageData }) => {
      const recievedMessage = recievedMessageData.data.messageSent;
      addMyMessageToTheUi(
        recievedMessage?.value,
        'text',
        {
          ...recievedMessage.sentUser,
        },
        data?.isPrivateChat ? true : false
      );
    },
  });

  useEffect(() => {
    if (!otherUserIdQuery) return;
    const cached = queryCache.getQueryData([ROOM_MESSAGES, otherUserIdQuery]);
    !cached && fetcMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherUserIdQuery]);

  const isLoading = status === 'loading';
  const noChatIsSelected = status === 'idle';

  if (noChatIsSelected) {
    return (
      <div className='relative h-full bg-secondary-600/80'>
        <Image
          src='/images/chat-bg.jpg'
          fill
          alt='chat bg'
          className='object-cover'
        />
      </div>
    );
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
    <div className='relative flex h-full flex-col'>
      {/* other user info */}
      <div className='sticky inset-x-0 top-0 py-4 px-5 shadow-lg backdrop-blur-lg'>
        <div className='flex items-center gap-4'>
          {/* image */}
          <UserProfileImage
            rounded
            src={data?.otherUser?.image_src}
            size={50}
          />

          {/* name and medical specialization */}
          {data?.otherUser && (
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <LongText
                  text={data.otherUser.name}
                  maxChars={50}
                  className='text-3xl'
                />
                {data.isPrivateChat && (
                  <span className='mx-4 rounded-lg bg-primary-200 px-2 text-lg text-white'>
                    Message yourself
                  </span>
                )}
              </div>
              {data.otherUser.medicalSpecialization && (
                <div className='flex items-center gap-3 fill-gray-500 text-2xl text-gray-500'>
                  <StethoScopeIcon />
                  <span>{data.otherUser.medicalSpecialization}</span>
                </div>
              )}
            </div>
          )}
        </div>
        {/* {isPrivateChat && (
          <div className='my-4 rounded-lg bg-base-300 py-4 px-3 text-2xl leading-relaxed shadow-lg '>
            This is your space. Draft messages, make to-do lists or keep links
            to hand. You can also talk to yourself here, but please bear in mind
            you'll have to provide both sides of the conversation.
          </div>
        )} */}
      </div>

      <Messages messages={data?.messages || []} otherUser={data?.otherUser} />

      <SendMessageInput
        handleOpenRecordsModal={handleOpenRecordsModal}
        addMyMessageToTheUi={(v) =>
          addMyMessageToTheUi(v, 'text', data?.otherUser, true)
        }
      />

      {/* records modal */}
      <RecordsModal
        shown={showRecordsModal}
        onClose={handleCloseRecordsModal}
        handleSendMedicalRecord={handleSendMedicalRecord}
      />
    </div>
  );
};

export default ChatView;
