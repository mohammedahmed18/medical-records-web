import { twMerge } from 'tailwind-merge';

import styles from './Spinner.module.css';
const Spinner = ({
  size = 30,
  customStyle = {},
  className = '',
  reversed = false,
}) => {
  return (
    <div
      className={twMerge(
        styles.spinner,
        reversed && styles.reversed,
        className
      )}
      style={{ width: size, height: size, ...customStyle }}
    ></div>
  );
};

export default Spinner;
