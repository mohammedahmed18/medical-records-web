import _ from 'lodash';

import Skeleton from '../Skeleton';

const DoctorsSkeleton = () => {
  const numberOfDoctors = 40;
  const OneRoomSkeleton = () => (
    <div className='w-full rounded-md px-7 py-4 shadow-md'>
      <div className='flex gap-2'>
        <Skeleton className='mask mask-squircle h-28 w-28' />
        <div className='flex flex-1 flex-col gap-5'>
          <Skeleton className='h-4 w-1/2 rounded-md ' />
          <Skeleton className='h-4 w-full rounded-md ' />
        </div>
      </div>
    </div>
  );
  return (
    <div className='grid grid-cols-1 gap-5 p-4 md:grid-cols-3 lg:grid-cols-4'>
      {_.range(numberOfDoctors).map((i) => (
        <OneRoomSkeleton key={i} />
      ))}
    </div>
  );
};

export default DoctorsSkeleton;
