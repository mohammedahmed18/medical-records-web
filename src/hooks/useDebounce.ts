import { useEffect } from 'react';

import useTimeout from './useTimeout';

export function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: []
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
}
