import clsx from 'clsx';
import { useRef } from 'react';
import QrReader from 'react-qr-reader';

import styles from './styles.module.css';

import Modal from '@components/common/modal';
import Spinner from '@components/common/spinner';
import QrContainer from '@components/qrContainer';

import { showToast } from '@/utils/toast';

type props = {
  showQrModal?: boolean;
  onClose?: () => void;
  isLoading: boolean;
  mutate: (a: string) => void;
  size?: number;
};
const ScanQrCode = ({
  showQrModal,
  onClose,
  mutate,
  isLoading,
  size,
}: props) => {
  const qrTokenRef = useRef<string>();

  const handleMutation = async (token: string) => {
    if (token === qrTokenRef.current) return;

    qrTokenRef.current = token;

    await mutate(token);
    onClose && onClose();
  };

  const baseSize = size || 250;
  const Content = (
    <>
      <QrContainer width={baseSize} height={baseSize}>
        <QrReader
          onScan={(data) => {
            if (data) return handleMutation(data);
          }}
          onError={(err) => {
            if (err.name === 'NotFoundError') {
              //camera not found
              return showToast('no camera device found', 'error');
            }
            showToast('something went wrong : ' + err.message, 'error');
          }}
          // onResult={(result, err) => {
          //   if (result) {
          //     return setQrToken(result.getText());
          //   }
          //   if (!!err && JSON.stringify(err) !== JSON.stringify({})) {
          //     if (err.name === 'NotFoundError') {
          //       //camera not found
          //       return showToast('no camera device found', 'error');
          //     }
          //     showToast('something went wrong : ' + err.message, 'error');
          //   }
          // }}
          facingMode='user'
          style={{
            width: baseSize - 40,
            // paddingTop: '75%',
          }}
          delay={300}
          key='qr reader'
          showViewFinder={false}
          className={clsx('inset-0 h-auto', styles.videoContainer)}
        />
      </QrContainer>
      {isLoading && <Spinner className='mx-auto' size={40} />}
    </>
  );
  return onClose !== undefined ? (
    <Modal shown={showQrModal || false} onClose={onClose}>
      {Content}
    </Modal>
  ) : (
    Content
  );
};

export default ScanQrCode;
