import MedicalRecordCard from '../medicalRecordCard';

import { MedicalRecord } from '@/types/medicalRecords';

type props = {
  records: MedicalRecord[];
};
const MedicalRecordsList = ({ records }: props) => {
  return (
    <div className='p-20'>
      <ol className='relative border-l border-gray-200'>
        {records.map((r) => (
          <MedicalRecordCard medicalRecord={r} key={r.id} />
        ))}
      </ol>
    </div>
  );
};

export default MedicalRecordsList;
