import { useEffect, useState } from 'react';

import { useMyRecords } from '@/hooks/useMyRecords';

import Button from '@/components/buttons/Button';
import Modal from '@/components/common/modal';
import Spinner from '@/components/common/spinner';
import MedicalRecordsList from '@/components/medicalRecordsList';

import { MedicalRecord } from '@/types/medicalRecords';

type Props = {
  onClose: () => void;
  shown: boolean;
  handleSendMedicalRecord: (record: MedicalRecord) => void;
};
const RecordsModal = (props: Props) => {
  const { recordsData, isLoading } = useMyRecords(
    {},
    { stop: !props.shown, withDoctor: 'false' }
  ); // call the records api if the modal is opened
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord>();

  useEffect(() => {
    if (props.shown) setSelectedRecord(undefined);
  }, [props.shown]);

  return (
    <Modal {...props}>
      {isLoading && <Spinner size={30} className='mx-auto' />}
      {!isLoading && !recordsData.length && (
        <span className='block text-center text-4xl capitalize text-zinc-500'>
          You don't have any Records To Show
        </span>
      )}

      {selectedRecord?.id && (
        <div className='absolute inset-x-0 bottom-0 z-50 flex w-full items-center justify-between bg-primary-100 px-4 py-7'>
          <span className='text-3xl font-bold text-white'>
            Send Medical record
          </span>
          <Button
            onClick={() => {
              props.handleSendMedicalRecord(selectedRecord);
              props.onClose();
            }}
            variant='light'
            size='lg'
            className='rounded-full opacity-80 shadow-md'
          >
            Send
          </Button>
        </div>
      )}
      {recordsData.length > 0 && (
        <div className='max-h-[400px] overflow-y-auto'>
          <MedicalRecordsList
            records={recordsData}
            withSideDetails={false}
            currentActiceRecordId={selectedRecord?.id}
            setActiveRecord={setSelectedRecord}
          />
        </div>
      )}
    </Modal>
  );
};

export default RecordsModal;
