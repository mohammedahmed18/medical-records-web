import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useQueryClient } from 'react-query';

import { MessageResponse } from '@/api/messaging';
import IconButton from '@/components/IconButton';
import { ROOM_MESSAGES } from '@/constant/queryKeys';
import { SEND_MESSAGE } from '@/graphql/messages';

import MessageIcon from '~/svg/send-message-icon.svg';

const SendMessageInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryCache = useQueryClient();
  const router = useRouter();
  const { u: otherUserId } = router.query;

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    // onCompleted: (data) => {
    //    const { sendMessage: newMessage } = data;
    // },
  });

  const addMyMessageToTheUi = (messageText: string) => {
    if (inputRef.current) inputRef.current.value = '';
    const updater = (cacheValue: MessageResponse | undefined) => {
      const previousMessages = cacheValue?.messages || [];
      return {
        isPrivateChat: cacheValue?.isPrivateChat || false,
        otherUser: cacheValue?.otherUser,
        messages: [
          ...previousMessages,
          {
            value: messageText,
            type: 'text',
            isMe: true,
            createdAt: new Date(),
          },
        ],
      };
    };

    queryCache.setQueryData([ROOM_MESSAGES, otherUserId], updater);
  };
  const handleSendMessage = () => {
    if (!inputRef.current) return;
    const messageText = inputRef.current.value;
    if (messageText.trim() == '') return;
    addMyMessageToTheUi(messageText);
    sendMessage({ variables: { value: messageText, toId: otherUserId } });
  };

  return (
    <div className='bg- mx-7 mb-3 overflow-hidden rounded-full bg-slate-100 px-7'>
      <form
        className='flex w-full items-center gap-5'
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          ref={inputRef}
          className='w-full
          border-b-2 
          bg-transparent py-4 text-3xl
          outline-none
          '
          type='text'
          placeholder='type your message...'
        />
        <span
          className='cursor-pointer rounded  fill-white p-3 text-4xl'
          onClick={handleSendMessage}
        >
          <IconButton
            Icon={MessageIcon}
            className='rounded-full bg-primary-100 shadow-sm hover:bg-primary-200 hover:shadow-2xl active:bg-primary-50'
            type='submit'
          />
        </span>
      </form>
    </div>
  );
};

export default SendMessageInput;
