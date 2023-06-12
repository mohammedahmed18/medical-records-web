import { useState } from 'react';

import { useMyRecords } from '@/hooks/useMyRecords';

import Modal from '@/components/common/modal';
import Spinner from '@/components/common/spinner';
import MedicalRecordsList from '@/components/medicalRecordsList';

import { MedicalRecord } from '@/types/medicalRecords';

type Props = {
  onClose: () => void;
  shown: boolean;
};
const RecordsModal = (props: Props) => {
  const { recordsData, isLoading } = useMyRecords(
    {},
    { stop: !props.shown, withDoctor: 'false' }
  ); // call the records api if the modal is opened
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord>();
  return (
    <Modal {...props}>
      {isLoading && <Spinner size={30} className='mx-auto' />}
      {!isLoading && !recordsData.length && (
        <span className='block text-center text-4xl capitalize text-zinc-500'>
          You don't have any Records To Show
        </span>
      )}
      <MedicalRecordsList
        records={recordsData}
        withSideDetails={false}
        currentActiceRecordId={selectedRecord?.id}
        setActiveRecord={setSelectedRecord}
      />
    </Modal>
  );
};

export default RecordsModal;
