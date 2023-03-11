import MedicalRecordsSkeleton from './medicalRecords.skeleton';
import Container from '../container';
import Skeleton from '../Skeleton';

const MedicalRecordsPageSkeleton = () => {
  return (
    <Container className='p-10'>
      <div className='flex flex-col gap-3 md:flex-row'>
        <div className='flex flex-col gap-7 md:w-1/5'>
          <Skeleton className='h-16 w-full rounded-2xl' />
          <Skeleton className='h-16 w-full rounded-2xl' />
          <Skeleton className='h-16 w-full rounded-2xl' />
          <Skeleton className='h-16 w-full rounded-2xl' />
          <Skeleton className='h-16 w-full rounded-2xl' />
          <Skeleton className='h-16 w-full rounded-2xl' />
          <Skeleton className='h-16 w-full rounded-2xl' />
        </div>
        <div className='flex-1'>
          <MedicalRecordsSkeleton />
        </div>
      </div>
    </Container>
  );
};

export default MedicalRecordsPageSkeleton;
