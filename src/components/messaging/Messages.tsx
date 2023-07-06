import moment from 'moment';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { RoomMessageType } from '@/api/messaging';
import { PublicUserInfo } from '@/api/users';
import MessageItem from '@/components/messaging/MessageItem';

type Props = {
  messages: RoomMessageType[];
  otherUser?: PublicUserInfo;
};

const Messages = ({ messages, otherUser }: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // const [showScrollToBottom, setShowScrollToBottom] = useState(false);
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
      className='flex flex-1 flex-col overflow-y-auto pb-4 pt-24'
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
      {messages.map((message, i) => {
        // TODO: combine this logic in a seperate component
        const prevDate = i > 0 ? moment(messages[i - 1].createdAt) : null;
        const currentDate = moment(message.createdAt);

        const willShowDate =
          currentDate.year() !== prevDate?.year() ||
          currentDate.month() !== prevDate.month();
        return (
          <div key={i}>
            {willShowDate && (
              <span className='mx-auto mb-4 block w-fit rounded-lg bg-zinc-200 px-4 py-1 text-center text-lg text-gray-600'>
                {moment(message.createdAt).format('MMMM YYYY')}
              </span>
            )}
            <MessageItem
              message={message}
              key={i}
              otherUserImage={otherUser?.image_src}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
