import moment from 'moment';
import { twMerge } from 'tailwind-merge';

import { RoomMessageType } from '@/api/messaging';
import MedicalRecordDetails from '@/components/medicalRecordDetails';

type Props = {
  message: RoomMessageType;
};
const MessageItem = ({ message }: Props) => {
  const { createdAt, isMe, value, type } = message;

  const Time = (
    <span
      className={twMerge('text-2xl text-gray-400', isMe && 'ml-auto items-end')}
    >
      {moment(createdAt).fromNow()}
    </span>
  );
  if (type === 'medicalRecord') {
    const parsedMedicalRecord = JSON.parse(value);
    return (
      <div
        className={twMerge(
          'm-7 flex w-[80%] flex-col gap-2 px-5 lg:w-[50%]',
          isMe && 'ml-auto items-end'
        )}
      >
        <div
          className={twMerge(
            'w-full rounded-3xl border-2 bg-gray-100 p-5 shadow-lg'
          )}
        >
          <MedicalRecordDetails record={parsedMedicalRecord} />
        </div>
        {Time}
      </div>
    );
  }
  // normal text message
  return (
    <div
      className={twMerge(
        'm-7 flex flex-col gap-2',
        isMe && 'ml-auto items-end'
      )}
    >
      <p
        className={twMerge(
          `flex w-fit max-w-[200px] flex-col gap-4 whitespace-pre-wrap break-words rounded-3xl p-7 font-primary text-3xl leading-loose shadow-lg md:max-w-[300px] lg:max-w-[400px]`,
          isMe
            ? 'rounded-br-none bg-primary-100 text-white'
            : 'rounded-bl-none bg-gray-100'
        )}
      >
        {value}
      </p>

      {Time}
    </div>
  );
};

export default MessageItem;
