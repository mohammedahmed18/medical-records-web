import clsx from 'clsx';

import styles from './Spinner.module.css';
const Spinner = ({
  size = 30,
  customStyle = {},
  className = '',
  color = 'white',
}) => {
  return (
    <div
      className={clsx(
        styles.spinner,
        className,
        `border-2 border-${color} border-t-transparent`
      )}
      style={{ width: size, height: size, ...customStyle }}
    ></div>
  );
};

export default Spinner;
