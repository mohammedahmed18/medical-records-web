import React from 'react';
import { useMutation } from 'react-query';

import { readUserRecords } from '@/api/doctors';
import Button from '@/components/buttons/Button';
import Spinner from '@/components/common/spinner';
import ScanQrCode from '@/components/doctors/scanQrCode';
import MedicalRecordsList from '@/components/medicalRecordsList';

import ScanQrIcon from '~/svg/scan-icon.svg';

const ScanUsersRecords = () => {
  const [showQrModal, setShowQrModal] = React.useState(false);
  const { isLoading, mutate, data } = useMutation({
    mutationFn: readUserRecords,
  });

  const records = data || [];
  return (
    <div className='flex w-full flex-col pt-10'>
      <div className='mx-auto flex w-fit flex-col items-center'>
        <Button
          size='lg'
          // variant='light'
          className='gap-3 py-4'
          onClick={() => setShowQrModal(true)}
        >
          <ScanQrIcon className='h-8 w-8 fill-white' />
          <span>view patient medical records </span>
        </Button>
      </div>
      <ScanQrCode
        size={250}
        showQrModal={showQrModal}
        onClose={() => setShowQrModal(false)}
        mutate={mutate}
        isLoading={isLoading}
      />
      {isLoading && (
        <div className='center-content my-10'>
          <Spinner size={80} />
        </div>
      )}

      {data && records.length === 0 && (
        <h3 className='my-4 text-center text-4xl text-gray-600'>
          No Records Found
        </h3>
      )}
      {data && records.length !== 0 && (
        <div className='m-10 border-2 p-10 shadow-lg'>
          <h3 className='text-3xl text-gray-600 underline'>User Records</h3>
          <MedicalRecordsList records={records} />
        </div>
      )}
    </div>
  );
};

export default ScanUsersRecords;
