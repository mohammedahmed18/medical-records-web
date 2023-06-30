import _ from 'lodash';

import Skeleton from '@/components/Skeleton';
const ReviewsSkeleton = () => {
  const COUNT = 7;
  return (
    <div className='flex flex-col gap-4'>
      {_.range(COUNT).map((n) => (
        <div key={n} className=' center-content flex-col gap-4 py-5 shadow-lg'>
          <Skeleton className='h-40 w-40 rounded-full' />
          <Skeleton className='h-6 w-40 rounded-lg' />
          <div className='center-content mt-7 flex-col'>
            <Skeleton className='mb-4 h-4 w-20 rounded-lg' />
            <Skeleton className='mb-4 h-4 w-96 rounded-lg' />
            <Skeleton className='h-4 w-80 rounded-lg' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSkeleton;
