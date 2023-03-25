import Spinner from '@/components/common/spinner';

const GlobalLoading = () => {
  return (
    <div className='center-content h-screen'>
      <Spinner size={70} color='blue-500' />
    </div>
  );
};

export default GlobalLoading;
