import clsx from 'clsx';
import React, { useCallback } from 'react';

interface TooltipProps {
  title?: string;
  className?: string;
  direction?:
    | 'tooltip-top'
    | 'tooltip-bottom'
    | 'tooltip-right'
    | 'tooltip-left';
}
import styles from './Tooltip.module.css';
const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  title,
  className,
  direction,
}) => {
  const content = useCallback(() => {
    return (
      <div
        className={clsx(
          `tooltip h-fit w-fit`,
          direction,
          styles.tooltip,
          className
        )}
        data-tip={title}
      >
        {children}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, className]);
  return <div className='relative w-fit'>{content()}</div>;
};

export default Tooltip;
