import clsx from 'clsx';

import styles from './styles.module.css';

import Spinner from '@/components/common/spinner';
const GlobalLoading = () => {
  return (
    <div
      className={clsx(
        'center-content fixed inset-0 z-[99999] h-screen',
        styles.container
      )}
    >
      <Spinner size={130} className='absolute border-t-white' />
      <Spinner size={100} reversed className='border-t-white' />
    </div>
  );
};
export default GlobalLoading;
