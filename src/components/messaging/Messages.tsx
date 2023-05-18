import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { RoomMessageType } from '@/api/messaging';
import MessageItem from '@/components/messaging/MessageItem';

type Props = {
  messages: RoomMessageType[];
};

const Messages = ({ messages }: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (smoothe = false) => {
    const lastChildElement = messagesContainerRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({
      behavior: smoothe ? 'smooth' : 'auto',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);
  return (
    <div
      className='flex flex-1 flex-col overflow-y-auto py-4'
      ref={messagesContainerRef}
    >
      {!messages.length && (
        <div className='flex h-full items-center justify-center'>
          <Image
            src='/images/no-messages.png'
            alt='no messages'
            width={7000}
            height={6000}
            className='w-60 object-cover opacity-20 md:w-72 lg:w-96'
          />
        </div>
      )}
      {messages.map((message, i) => (
        <MessageItem message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
