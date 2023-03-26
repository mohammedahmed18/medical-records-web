import clsx from 'clsx';

import styles from './Spinner.module.css';
const Spinner = ({ size = 30, customStyle = {}, className = '' }) => {
  return (
    <div
      className={clsx(
        styles.spinner,
        `border-2 border-primary-50 border-t-transparent`,
        className
      )}
      style={{ width: size, height: size, ...customStyle }}
    ></div>
  );
};

export default Spinner;
