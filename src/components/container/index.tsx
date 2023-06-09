import clsx from 'clsx';

import styles from './styles.module.css';
type props = {
  children: React.ReactNode;
  className?: string;
  removeSpacing?: boolean;
  narrow?: boolean;
};
const Container = ({ children, className, narrow, removeSpacing }: props) => {
  return (
    <div
      className={clsx(
        'px-7',
        className,
        !removeSpacing && 'mx-auto max-w-screen-xl',
        narrow && !removeSpacing && styles.narrowContainer
      )}
    >
      {children}
    </div>
  );
};

export default Container;
