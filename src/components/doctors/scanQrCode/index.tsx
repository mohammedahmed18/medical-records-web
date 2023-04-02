import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

import useUpdateEffect from '@/hooks/useUpdateEffect';

import Modal from '@/components/common/modal';
import Spinner from '@/components/common/spinner';
import QrContainer from '@/components/qrContainer';

import { showToast } from '@/utils/toast';

type props = {
  showQrModal: boolean;
  onClose: () => void;
  isLoading: boolean;
  mutate: (a: string) => void;
};
const ScanQrCode = ({ showQrModal, onClose, mutate, isLoading }: props) => {
  const [qrToken, setQrToken] = useState<string>();

  const handleGettingTheUser = async (token: string) => {
    await mutate(token);
    onClose();
  };
  useUpdateEffect(() => {
    if (!qrToken) return;
    handleGettingTheUser(qrToken);
  }, [qrToken]);

  return (
    <Modal shown={showQrModal} onClose={onClose}>
      <QrContainer width={250} height={220}>
        <QrReader
          onResult={(result, err) => {
            if (result) return setQrToken(result.getText());
            if (!!err && JSON.stringify(err) !== JSON.stringify({})) {
              if (err.name === 'NotFoundError') {
                //camera not found
                return showToast('no camera device found', 'error');
              }
              showToast('something went wrong : ' + err.message, 'error');
            }
          }}
          scanDelay={300}
          constraints={{
            facingMode: 'environment',
          }}
          className='h-[200px] w-[200px]'
        />
      </QrContainer>
      {isLoading && <Spinner className='mx-auto' size={40} />}
    </Modal>
  );
};

export default ScanQrCode;
