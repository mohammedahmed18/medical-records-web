import moment from 'moment';
import { twMerge } from 'tailwind-merge';

import { RoomMessageType } from '@/api/messaging';
import UserProfileImage from '@/components/common/UserProfileImage';
import MedicalRecordDetails from '@/components/medicalRecordDetails';
import { useAuth } from '@/contexts/authContext';
import { resizeCloudinaryImage } from '@/utils/resizeCloudinary';

type Props = {
  message: RoomMessageType;
  otherUserImage?: string;
};
const MessageItem = ({ message, otherUserImage }: Props) => {
  const { createdAt, isMe, value, type } = message;

  const {
    user: { image_src: myImage },
  } = useAuth();
  const Time = (
    <span
      className={twMerge('text-2xl text-gray-400', isMe && 'ml-auto items-end')}
    >
      {moment(createdAt).fromNow()}
    </span>
  );

  const Image = () => {
    const src = isMe ? myImage : otherUserImage;
    const imageSize = 50;
    return (
      <UserProfileImage
        src={resizeCloudinaryImage(src, imageSize)}
        size={imageSize}
        rounded
        className={twMerge('h-fit shadow-md')}
      />
    );
  };

  const Content = () => {
    if (type === 'text')
      return (
        <div className='flex gap-4'>
          <p
            className={twMerge(
              `flex w-fit max-w-[200px] flex-col gap-4 whitespace-pre-wrap break-words rounded-3xl px-7 py-2 font-primary text-3xl leading-loose shadow-lg md:max-w-[300px] lg:max-w-[400px]`,
              isMe ? 'bg-primary-100 text-white' : 'bg-gray-100'
            )}
          >
            {value}
          </p>
        </div>
      );
    else if (type === 'medicalRecord') {
      const parsedMedicalRecord = JSON.parse(value);

      return (
        <div
          className={twMerge(
            'w-full rounded-3xl border-2 bg-gray-100 p-5 shadow-lg'
          )}
        >
          <MedicalRecordDetails record={parsedMedicalRecord} />
        </div>
      );
    }
  };

  return (
    <div
      className={twMerge(
        'm-7 flex flex-col gap-2',
        isMe && 'ml-auto items-end',
        type === 'medicalRecord' && 'w-[80%] lg:w-1/2'
      )}
    >
      <div
        className={twMerge(
          'flex items-end gap-3',
          isMe && 'flex-row-reverse',
          'w-full'
        )}
      >
        {Image()}
        {Content()}
      </div>
      {Time}
    </div>
  );
};

export default MessageItem;
