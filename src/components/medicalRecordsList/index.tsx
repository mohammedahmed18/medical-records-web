import clsx from 'clsx';
import moment from 'moment';
import { useEffect, useState } from 'react';

import styles from './MedicalRecordsList.module.css';

import SideModal from '../common/sideModal';
import MedicalRecordCard from '../medicalRecordCard';

import { MedicalRecord } from '@/types/medicalRecords';
type props = {
  records: MedicalRecord[];
  withSideDetails?: boolean;
  setActiveRecord?: (record: MedicalRecord) => void;
  currentActiceRecordId?: string;
  inlineDetains?: boolean; // TODO: implement inline details instead of the side view
};
const MedicalRecordsList = ({
  records,
  withSideDetails = true,
  setActiveRecord,
  currentActiceRecordId,
}: props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [Details, SetDetails] = useState<React.ReactNode>(null);
  useEffect(() => {
    if (showDetails) document.body.classList.add('scrollbar-hide');
    else document.body.classList.remove('scrollbar-hide');
  }, [showDetails]);
  return (
    <div className={clsx('max-h-min overflow-hidden p-10', styles.list)}>
      {withSideDetails && (
        <SideModal shown={showDetails} closePanel={() => setShowDetails(false)}>
          {Details}
        </SideModal>
      )}

      <ol className='relative border-l border-gray-300'>
        {records.map((r, i) => {
          const prevDate = i > 0 ? moment(records[i - 1].createdAt) : null;
          return (
            <MedicalRecordCard
              medicalRecord={r}
              key={r.id}
              prevDate={prevDate}
              showDetails={(Content) => {
                SetDetails(Content);
                setShowDetails(true);
              }}
              setActive={setActiveRecord}
              currentActiceRecordId={currentActiceRecordId}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default MedicalRecordsList;
