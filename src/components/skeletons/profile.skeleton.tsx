import Spinner from '@/components/common/spinner';
import Skeleton from '@/components/Skeleton';

const ProfileSkeleton = () => {
  return (
    <div className='center-content flex-col gap-7'>
      <Skeleton className='h-80 w-80 rounded-full' />
      <Skeleton className='h-4 w-80 rounded-lg' />
      <Skeleton className='h-6 w-60 rounded-full' />
      <Skeleton className='h-6 w-48 rounded-full' />
      <Skeleton className='mt-40 h-80 w-full rounded-lg' />

      <Spinner size={80} className='mt-10' />
    </div>
  );
};

export default ProfileSkeleton;
