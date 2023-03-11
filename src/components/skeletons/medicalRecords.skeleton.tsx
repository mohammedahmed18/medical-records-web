import _ from 'lodash';

import Skeleton from '../Skeleton';

const MedicalRecordsSkeleton = () => {
  const numberOfRecords = 5;
  const OneRecordSkeleton = () => (
    <div className='w-full rounded-md p-7 shadow-md'>
      <Skeleton className='mb-2 h-8 w-1/2' />
      <Skeleton className='h-8 w-1/4' />
      <div className='my-7'></div>

      <div className='flex items-center gap-4'>
        <Skeleton className='h-20 w-20 rounded-full' />
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-40' />
        </div>
      </div>
    </div>
  );
  return (
    <div className='flex flex-col gap-5 px-10'>
      {_.range(numberOfRecords).map((i) => (
        <OneRecordSkeleton key={i} />
      ))}
    </div>
  );
};

export default MedicalRecordsSkeleton;
