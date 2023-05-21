import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useTimeoutAsync } from '@/hooks/useTimeoutAsync';

import { generateQrcode } from '@/api/users';
import GenerateQrModal from '@/components/generateQrCode/generateQrModal';
import IconButton from '@/components/IconButton';
import { showToast } from '@/utils/toast';

import QrCodeIcon from '~/svg/qr-code.svg';

const GenerateQrCode: React.FC = () => {
  const QR_LIFETIME_MINS = 0.5;

  const [showQrcode, setShowQrcode] = useState(false);
  const [canRefresh, setCanRefresh] = useState(true);

  const { set } = useTimeoutAsync(() => {
    setCanRefresh(true);
  }, 1000 * 60 * QR_LIFETIME_MINS);

  const {
    data: qrcode,
    refetch,
    isRefetching,
    status,
  } = useQuery({
    queryFn: generateQrcode,
    enabled: false,
    keepPreviousData: false,
  });

  const handleGenerateQrcode = async () => {
    if (!canRefresh) {
      return showToast(
        `you must wait ${
          QR_LIFETIME_MINS < 1
            ? QR_LIFETIME_MINS * 60 + ' seconds'
            : QR_LIFETIME_MINS + ' minute(s)'
        } to refresh the qr code`,
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
      <IconButton onClick={handleShowQrModal} Icon={QrCodeIcon} />

      <GenerateQrModal
        handleGenerateQrcode={handleGenerateQrcode}
        loading={status === 'loading'}
        isRefetching={isRefetching}
        onClose={() => setShowQrcode(false)}
        qrcode={qrcode}
        showQrcode={showQrcode}
      />
    </>
  );
};

export default GenerateQrCode;
