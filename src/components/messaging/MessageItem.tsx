import clsx from 'clsx';
import moment from 'moment';

import { RoomMessageType } from '@/api/messaging';

type Props = {
  message: RoomMessageType;
};
const MessageItem = ({ message }: Props) => {
  const { createdAt, isMe, value } = message;
  return (
    <div
      className={clsx('m-7 flex flex-col gap-2', isMe && 'ml-auto items-end')}
    >
      <p
        className={clsx(
          `flex w-fit max-w-[200px] flex-col gap-4 whitespace-pre-wrap break-words rounded-3xl p-7 font-primary text-3xl leading-loose shadow-lg md:max-w-[300px] lg:max-w-[400px]`,
          isMe
            ? 'rounded-br-none bg-primary-100 text-white'
            : 'rounded-bl-none bg-gray-100'
        )}
      >
        {value}
      </p>
      <span className={clsx('text-2xl text-gray-400', isMe && 'ml-auto')}>
        {moment(createdAt).fromNow()}
      </span>
    </div>
  );
};

export default MessageItem;
