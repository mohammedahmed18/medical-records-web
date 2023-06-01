import clsx from 'clsx';
import React, { useCallback } from 'react';

import styles from './Tooltip.module.css';

import { useTimeoutAsync } from '@/hooks/useTimeoutAsync';
interface TooltipProps {
  title?: string;
  className?: string;
}

const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  title,
  className,
}) => {
  const [visible, setVisible] = React.useState(false);

  const { set, setCallback } = useTimeoutAsync(() => null, 200);

  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleMouseEvent = (_visible: boolean) => {
    setCallback(() => setVisible(_visible));
    set();
  };
  const content = useCallback(() => {
    return (
      <div
        className={clsx('h-fit w-fit', className)}
        onMouseEnter={() => handleMouseEvent(true)}
        onMouseLeave={() => handleMouseEvent(false)}
        onBlur={() => handleMouseEvent(false)}
      >
        {children}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, className, setCallback]);
  return (
    <div className='relative w-fit' onClick={() => handleMouseEvent(false)}>
      {title && (
        <div className={clsx(styles.tooltip, visible ? 'block' : 'hidden')}>
          {title}
        </div>
      )}
      {content()}
    </div>
  );
};

export default Tooltip;
