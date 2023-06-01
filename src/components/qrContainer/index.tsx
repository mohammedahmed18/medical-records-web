import clsx from 'clsx';

import styles from './QrContainer.module.css';

import QrIcon from '~/svg/qr-code.svg';
type props = {
  children: React.ReactNode;
  width?: number;
  height?: number;
};
const QrContainer = ({ children, width = 240, height = 240 }: props) => {
  const borderRadius = width / 5.5 + 'px';
  return (
    <div className={clsx(styles.qr_container, 'relative mx-auto my-20 w-fit')}>
      <QrIcon className='absolute -top-28 fill-gray-400 text-3xl' />
      <div
        className={styles.square}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div
          style={{
            borderTopLeftRadius: borderRadius,
          }}
        ></div>
        <div
          style={{
            borderTopRightRadius: borderRadius,
          }}
        ></div>
        <div
          style={{
            borderBottomLeftRadius: borderRadius,
          }}
        ></div>
        <div
          style={{
            borderBottomRightRadius: borderRadius,
          }}
        ></div>
      </div>
      <div
        className={clsx(styles.content, 'overflow-hidden')}
        style={{
          borderRadius: 30,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default QrContainer;
