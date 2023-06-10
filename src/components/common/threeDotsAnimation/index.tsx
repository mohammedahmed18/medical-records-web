import _ from 'lodash';
import { useEffect, useState } from 'react';

const ThreeDotsAnimation = () => {
  const [dotsNumber, setDotsNumber] = useState(0);
  const MAX_DOTS_NUMBER = 3;

  const handleDotsNumberChange = () => {
    setDotsNumber((prev) => {
      if (prev !== MAX_DOTS_NUMBER) return prev + 1;
      return 0;
    });
  };
  useEffect(() => {
    const interval = setInterval(handleDotsNumberChange, 300);
    return () => clearInterval(interval);
  }, []);
  return (
    <span>
      {_.range(dotsNumber).map((n) => (
        <span key={n}>.</span>
      ))}
    </span>
  );
};

export default ThreeDotsAnimation;
