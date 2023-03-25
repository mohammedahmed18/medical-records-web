import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useQuery } from 'react-query';

import { useTimeoutAsync } from '@/hooks/useTimeoutAsync';

import IconButton from '@/components/buttons/IconButton';
import Modal from '@/components/common/modal';
import Spinner from '@/components/common/spinner';
import Tooltip from '@/components/common/tooltip';

import { generateQrcode } from '@/api/users';
import { showToast } from '@/utils/toast';

import QrcodeIcon from '~/svg/qr-code.svg';
import RefreshIcon from '~/svg/refresh.svg';

const GenerateQrCode: React.FC = () => {
  const QR_LIFETIME_MINS = 1;

  const [showQrcode, setShowQrcode] = useState(false);
  const [canRefresh, setCanRefresh] = useState(true);

  const { set } = useTimeoutAsync(() => {
    setCanRefresh(true);
  }, 1000 * 60 * QR_LIFETIME_MINS);

  const {
    data: qrcode,
    isLoading: loading,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: generateQrcode,
    enabled: false,
  });

  const handleGenerateQrcode = () => {
    if (!canRefresh) {
      return showToast(
        `you must wait ${QR_LIFETIME_MINS} minute(s) to refresh the qr code`,
        'default'
      );
    }
    setCanRefresh(false);
    refetch();
  };
  const handleShowQrModal = () => {
    setShowQrcode(true);
    if (!qrcode) handleGenerateQrcode();
  };

  useEffect(() => {
    if (!canRefresh) set();
  }, [canRefresh, set]);

  return (
    <>
      <button onClick={handleShowQrModal}>
        <QrcodeIcon className='text-6xl transition-transform duration-300 hover:-translate-y-2' />
      </button>

      <Modal shown={showQrcode} onClose={() => setShowQrcode(false)}>
        <div className='flex flex-col items-center justify-center gap-4'>
          <Tooltip title='refresh'>
            <IconButton
              onClick={handleGenerateQrcode}
              icon={RefreshIcon}
              variant='light'
              className={clsx(
                'rounded-full text-2xl',
                isRefetching ? 'animate-spin' : ''
              )}
            />
          </Tooltip>

          <div className='center-content min-h-[200px]'>
            {loading && <Spinner size={70} color='primary-100' />}
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
    </>
  );
};

export default GenerateQrCode;
