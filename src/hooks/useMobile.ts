import { useEffect, useState } from 'react';

export const useMobile = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return { deviceWidth: width, isMobile };
};
