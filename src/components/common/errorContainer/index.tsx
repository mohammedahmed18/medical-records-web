import clsx from 'clsx';

import ArrowUp from '~/svg/triangle-top-arrow-icon.svg';

type Props = {
  children: React.ReactNode;
  withArrow?: boolean;
  className?: string;
};
const ErrorContainer = ({ children, withArrow = true, className }: Props) => {
  return (
    <div
      className={clsx(
        'relative mt-2 w-fit rounded-lg bg-error/40 px-7 py-4',
        className
      )}
    >
      {withArrow && (
        <ArrowUp className='absolute top-0 left-1/2 -translate-y-[75%] -translate-x-1/2 fill-error/40' />
      )}
      {children}
    </div>
  );
};

export default ErrorContainer;
