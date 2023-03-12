import clsx from 'clsx';
import moment from 'moment';

import styles from './MedicalRecordsList.module.css';

import MedicalRecordCard from '../medicalRecordCard';

import { MedicalRecord } from '@/types/medicalRecords';
type props = {
  records: MedicalRecord[];
};
const MedicalRecordsList = ({ records }: props) => {
  return (
    <div className={clsx('p-10', styles.list)}>
      <ol className='relative border-l border-gray-300'>
        {records.map((r, i) => {
          const prevDate = i > 0 ? moment(records[i - 1].createdAt) : null;
          return (
            <MedicalRecordCard
              medicalRecord={r}
              key={r.id}
              prevDate={prevDate}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default MedicalRecordsList;
