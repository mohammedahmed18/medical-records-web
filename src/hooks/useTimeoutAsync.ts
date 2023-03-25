import { useEffect } from 'react';

import useTimeout from './useTimeout';

export const useTimeoutAsync = (callback: () => void, delay: number) => {
  const { reset, set, setCallback } = useTimeout(callback, delay);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { setCallback, set };
};
