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
        <div className='flex justify-center'>
          <span className='rounded-2xl bg-primary-100/25 p-4 text-2xl '>
            No messages until now
          </span>
        </div>
      )}
      {messages.map((message, i) => (
        <MessageItem message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
