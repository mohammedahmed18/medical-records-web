import clsx from 'clsx';
import moment from 'moment';
import { useEffect, useState } from 'react';

import styles from './MedicalRecordsList.module.css';

import SideModal from '../common/sideModal';
import MedicalRecordCard from '../medicalRecordCard';

import { MedicalRecord } from '@/types/medicalRecords';
type props = {
  records: MedicalRecord[];
};
const MedicalRecordsList = ({ records }: props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [Details, SetDetails] = useState<React.ReactNode>(null);
  useEffect(() => {
    if (showDetails) document.body.classList.add('scrollbar-hide');
    else document.body.classList.remove('scrollbar-hide');
  }, [showDetails]);
  return (
    <div className={clsx('max-h-min overflow-hidden p-10', styles.list)}>
      <SideModal shown={showDetails} closePanel={() => setShowDetails(false)}>
        {Details}
      </SideModal>
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
            />
          );
        })}
      </ol>
    </div>
  );
};

export default MedicalRecordsList;
