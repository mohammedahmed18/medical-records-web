import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { RoomMessageType } from '@/api/messaging';

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
      {messages.map((message) => {
        return (
          <div
            className={clsx(
              `mx-4 mb-7 w-fit max-w-[200px] rounded-3xl  p-7 text-2xl md:max-w-[300px] lg:max-w-[400px]`,
              message.isMe
                ? ' ml-auto rounded-br-none bg-primary-100 text-white'
                : 'rounded-bl-none bg-gray-100'
            )}
            key={message.id}
          >
            {message.value}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
