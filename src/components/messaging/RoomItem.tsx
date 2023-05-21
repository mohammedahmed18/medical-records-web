import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/router';

import { RoomItemType } from '@/api/messaging';
import UserProfileImage from '@/components/common/UserProfileImage';
import LongText from '@/components/LongText';

type Props = {
  room: RoomItemType;
};
const RoomItem = ({ room }: Props) => {
  const router = useRouter();
  const {
    lastMessageTimestamp,
    lastMessage,
    otherUser: { image_src, name, id: otherUserId },
  } = room;

  const { u: userId } = useRouter().query;
  const active = userId === otherUserId;

  const handleOpenChat = () => {
    const query = { ...router.query, u: otherUserId };
    router.push({
      pathname: router.pathname,
      query,
    });
  };
  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };
  return (
    <div
      className={clsx(
        'flex cursor-pointer gap-2 rounded-lg py-4 px-2 shadow-md transition-colors duration-300',
        active ? 'bg-primary-100/80 text-white' : 'bg-base-200/70'
      )}
      onClick={handleOpenChat}
    >
      <UserProfileImage src={image_src} />
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <LongText
            text={name}
            className='text-2xl font-semibold'
            maxChars={15}
          />
          {lastMessage && (
            <span className='text-lg opacity-60'>
              {moment(lastMessageTimestamp).calendar()}
            </span>
          )}
        </div>
        {lastMessage && (
          <span className='text-2xl'>
            <LongText
              text={(lastMessage.isMe ? 'you' : getFirstName(name)) + ' : '}
              maxChars={15}
              className='font-bold'
            />
            <LongText
              text={lastMessage.type === 'text' ? lastMessage.value : ''}
              maxChars={27}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default RoomItem;
