import clsx from 'clsx';

import styles from './Modal.module.css';
type props = {
  children: React.ReactNode;
  shown: boolean;
  onClose: () => void;
};
const Modal: React.FC<props> = ({ children, shown, onClose }) => {
  if (!shown) return null;
  return (
    <>
      <div
        className='fixed inset-0 z-50 h-screen bg-black/50'
        onClick={onClose}
      ></div>
      <div className={clsx('fixed z-[90] w-fit', styles.content)}>
        {children}
      </div>
    </>
  );
};

export default Modal;
