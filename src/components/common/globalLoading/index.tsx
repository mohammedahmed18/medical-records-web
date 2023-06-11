import clsx from 'clsx';
import { useState } from 'react';

import styles from './styles.module.css';

import useTimeout from '@/hooks/useTimeout';

import Spinner from '@/components/common/spinner';
const GlobalLoading = () => {
  const [takesLongTime, setTakesLongTime] = useState(false);
  useTimeout(() => {
    setTakesLongTime(true);
  }, 5000);
  return (
    <div
      className={clsx(
        'center-content fixed inset-0 z-[99999] h-screen',
        styles.container
      )}
    >
      <Spinner size={130} className='absolute border-t-white' />
      <Spinner size={100} reversed className='absolute border-t-white' />

      {takesLongTime && (
        <h2 className='absolute bottom-1/4 text-center text-4xl text-white'>
          please wait the server is starting...
        </h2>
      )}
    </div>
  );
};
export default GlobalLoading;
