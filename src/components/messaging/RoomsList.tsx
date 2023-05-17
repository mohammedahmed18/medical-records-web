import { QueryStatus } from 'react-query';

import { RoomItemType } from '@/api/messaging';
import RoomItem from '@/components/messaging/RoomItem';
import RoomsSkeleton from '@/components/skeletons/rooms.skeleton';

type Props = {
  rooms: RoomItemType[];
  status: QueryStatus;
};
const RoomsList = ({ rooms, status }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {status === 'loading' && <RoomsSkeleton />}
      {rooms?.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomsList;
