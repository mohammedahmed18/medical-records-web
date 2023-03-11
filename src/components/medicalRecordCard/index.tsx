import moment from 'moment';

import DoctorMiniProfile from '../doctorMiniProfile';

import { MedicalRecord } from '@/types/medicalRecords';

import CalenderIcon from '~/svg/calender.svg';

type props = {
  medicalRecord: MedicalRecord;
};
const MedicalRecordCard = ({ medicalRecord }: props) => {
  return (
    <li className='mb-10 ml-6'>
      <span className='absolute -left-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-2 shadow-lg ring-4 ring-white'>
        <CalenderIcon className='fill-indigo-700 text-5xl' />
      </span>
      <div className='ml-10 rounded-lg p-4 shadow-md'>
        <h1 className='text-3xl capitalize'>{medicalRecord.title}</h1>
        {medicalRecord.doctor && (
          <DoctorMiniProfile {...medicalRecord.doctor} />
        )}
        <span className='text-xl text-gray-400'>
          {moment(medicalRecord.createdAt).fromNow()}
        </span>
      </div>
    </li>
  );
};

export default MedicalRecordCard;
