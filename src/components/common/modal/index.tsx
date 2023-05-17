import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './Modal.module.css';
type props = {
  children: React.ReactNode;
  shown: boolean;
  onClose: () => void;
};
const Modal: React.FC<props> = ({ children, shown, onClose }) => {
  const [finalShown, setFinalShown] = useState(() => {
    return new Boolean(shown).valueOf(); // make sure to copy the shown value
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      //
    }, 0);
    if (!shown) {
      // the modal will be hidden
      timer = setTimeout(() => {
        setFinalShown(false);
      }, 300);
    } else {
      setFinalShown(true);
    }
    return () => clearTimeout(timer);
  }, [shown]);

  if (!finalShown) return null;
  return (
    <div
      className='fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/40'
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={clsx(styles.content, !shown ? styles.hiddenModal : '')}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
