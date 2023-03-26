import Spinner from '@/components/common/spinner';

const GlobalLoading = () => {
  return (
    <div className='center-content fixed inset-0 z-[99999] h-screen'>
      <Spinner size={70} className='border-primary-50' />
    </div>
  );
};

export default GlobalLoading;
