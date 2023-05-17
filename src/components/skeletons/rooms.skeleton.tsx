import _ from 'lodash';

import Skeleton from '../Skeleton';

const RoomsSkeleton = () => {
  const numberOfRecords = 7;
  const OneRoomSkeleton = () => (
    <div className='w-full rounded-md px-7 py-4 shadow-md'>
      <div className='flex gap-2'>
        <Skeleton className='h-24 w-24 rounded-full' />
        <div className='flex flex-1 flex-col gap-5'>
          <Skeleton className='h-4 w-1/2 rounded-md ' />
          <Skeleton className='h-4 w-full rounded-md ' />
        </div>
      </div>
    </div>
  );
  return (
    <div className='flex flex-col gap-4'>
      {_.range(numberOfRecords).map((i) => (
        <OneRoomSkeleton key={i} />
      ))}
    </div>
  );
};

export default RoomsSkeleton;
