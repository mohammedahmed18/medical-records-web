import { RoomItemType } from '@/api/messaging';
import RoomItem from '@/components/messaging/RoomItem';

type Props = {
  rooms: RoomItemType[];
};
const RoomsList = ({ rooms }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {rooms?.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomsList;
