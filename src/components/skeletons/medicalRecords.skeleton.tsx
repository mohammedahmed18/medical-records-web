import _ from 'lodash';

import Skeleton from '../Skeleton';

const MedicalRecordsSkeleton = () => {
  const numberOfRecords = 5;
  const OneRecordSkeleton = () => (
    // <div className='w-full rounded-md p-7 shadow-md'>
    //   <Skeleton className='mb-2 h-8 w-1/2' />
    //   <Skeleton className='h-8 w-1/4' />
    //   <div className='my-7'></div>

    //   <div className='flex items-center gap-4'>
    //     <Skeleton className='h-20 w-20 rounded-full' />
    //     <div className='flex flex-col gap-4'>
    //       <Skeleton className='h-4 w-20' />
    //       <Skeleton className='h-4 w-40' />
    //     </div>
    //   </div>
    // </div>

    <li className='relative ml-6 p-2 md:p-5 '>
      <span className='absolute -left-14 flex items-center justify-center rounded-full bg-gray-100 p-2 shadow-lg ring-4 ring-white'>
        <Skeleton className='h-14 w-14 rounded-full' />
      </span>
      <div className='ml-10 rounded-lg bg-white p-7 shadow-md ring-1 ring-gray-200/75'>
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
    </li>
  );
  return (
    <div className='p-10'>
      <ol className='relative border-l border-gray-300'>
        {_.range(numberOfRecords).map((i) => (
          <OneRecordSkeleton key={i} />
        ))}
      </ol>
    </div>
  );
};

export default MedicalRecordsSkeleton;
