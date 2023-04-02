import jwt_decode from 'jwt-decode';
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
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt_decode(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded?.exp < now) return showToast('token is expired', 'error');
      await mutate(token);
      onClose();
    } catch (err) {
      showToast('token is invalid', 'error');
    }
  };
  useUpdateEffect(() => {
    if (!qrToken) return;
    handleGettingTheUser(qrToken);
  }, [qrToken]);

  return (
    <Modal shown={showQrModal} onClose={onClose}>
      <QrContainer width={250} height={220}>
        <QrReader
          onResult={(result) => {
            if (result) {
              setQrToken(result.getText());
            }
          }}
          constraints={{}}
          className='h-[200px] w-[200px]'
        />
      </QrContainer>
      {isLoading && <Spinner className='mx-auto' size={40} />}
    </Modal>
  );
};

export default ScanQrCode;
