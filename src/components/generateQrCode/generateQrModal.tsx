import clsx from 'clsx';
import QRCode from 'react-qr-code';

import Modal from '@/components/common/modal';
import Spinner from '@/components/common/spinner';
import IconButton from '@/components/IconButton';

import RefreshIcon from '~/svg/refresh.svg';

type Props = {
  showQrcode: boolean;
  onClose: () => void;
  handleGenerateQrcode: () => void;
  loading: boolean;
  isRefetching: boolean;
  qrcode?: string;
};
const GenerateQrModal = ({
  showQrcode,
  qrcode,
  loading,
  isRefetching,
  onClose,
  handleGenerateQrcode,
}: Props) => {
  return (
    <Modal shown={showQrcode} onClose={onClose}>
      <div className='flex flex-col items-center justify-center gap-4'>
        <IconButton
          onClick={handleGenerateQrcode}
          Icon={RefreshIcon}
          className={clsx(
            'rounded-full text-2xl',
            isRefetching ? 'animate-spin' : ''
          )}
        />

        {loading && <Spinner size={70} className='mt-7' />}

        <div className='center-content'>
          {qrcode && (
            <QRCode
              value={qrcode}
              size={200}
              className='rounded-2xl p-4 ring-4 ring-primary-200'
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default GenerateQrModal;
