import { useMutation } from '@apollo/client';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';

import styles from './styles.module.css';

import { MessageResponse } from '@/api/messaging';
import IconButton from '@/components/IconButton';
import { ROOM_MESSAGES } from '@/constant/queryKeys';
import { SEND_MESSAGE } from '@/graphql/messages';

import MessageIcon from '~/svg/send-message-icon.svg';
const SendMessageInput = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
            value: messageText.trim(),
            type: 'text',
            isMe: true,
            createdAt: new Date(),
          },
        ],
      };
    };

    queryCache.setQueryData([ROOM_MESSAGES, otherUserId], updater);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnter = event.key === 'Enter';

    if (event.shiftKey && isEnter) {
      // won't submit will just go line down
      return;
    }

    if (isEnter) {
      // submitting if the user just pressed the enter without shify
      event.preventDefault(); // so it doesn't go one line down when sending the message
      handleSendMessage();

      const textarea = inputRef.current;
      if (!textarea) return;
      textarea.style.height = 'auto';
      textarea.value = '';
    }
  };
  useEffect(() => {
    const textarea = inputRef.current;
    const container = containerRef.current;
    if (!textarea || !container) return;
    const handleHieghtResize = () => {
      textarea.style.height = 'auto';
      const multiLine = textarea.scrollHeight !== textarea.clientHeight;

      if (multiLine) container.classList.add('items-end');
      else container.classList.remove('items-end');

      if (textarea.value !== '')
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', handleHieghtResize);
    return () => textarea.removeEventListener('input', handleHieghtResize);
  }, []);
  const handleSendMessage = () => {
    if (!inputRef.current) return;
    const messageText = inputRef.current.value;
    if (messageText.trim() == '') return;
    addMyMessageToTheUi(messageText);
    sendMessage({
      variables: { value: messageText.trim(), toId: otherUserId },
    });
  };

  return (
    <div className='px-4'>
      <div
        ref={containerRef}
        className={clsx(styles['send-message-input'], 'mb-3')}
      >
        <textarea
          ref={inputRef}
          rows={1}
          className='flex bg-transparent'
          placeholder='Type your message...'
          onKeyDown={handleKeyPress}
        ></textarea>
        <span className={styles['send-button']} onClick={handleSendMessage}>
          <IconButton
            Icon={MessageIcon}
            className='rounded-full bg-primary-200 hover:bg-primary-100 active:bg-primary-100/70'
          />
        </span>
      </div>
    </div>
  );
};

export default SendMessageInput;
