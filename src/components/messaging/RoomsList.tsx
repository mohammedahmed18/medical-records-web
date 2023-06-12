import { useQuery } from 'react-query';

import { getMyRooms } from '@/api/messaging';
import RoomItem from '@/components/messaging/RoomItem';
import RoomsSkeleton from '@/components/skeletons/rooms.skeleton';
import { GET_MY_ROOMS } from '@/constant/queryKeys';

const RoomsList = () => {
  const { data, status } = useQuery([GET_MY_ROOMS], getMyRooms, {
    // keepPreviousData: true,
  });

  const rooms = data || [];

  // function getPrivateRoomFirst(a: RoomItemType, b: RoomItemType) {
  //   if (a.isPrivate) {
  //     return -1;
  //   }
  //   if (b.isPrivate) {
  //     return 1;
  //   }
  //   return 0;
  // }
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
