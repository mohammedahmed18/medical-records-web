import styles from './QrContainer.module.css';

import QrIcon from '~/svg/qr-code.svg';
type props = {
  children: React.ReactNode;
  width?: number;
  height?: number;
};
const QrContainer = ({ children, width = 240, height = 240 }: props) => {
  return (
    <div className={styles.qr_container}>
      <QrIcon className='fill-gray-400 text-3xl' />
      <div
        className={styles.square}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default QrContainer;
