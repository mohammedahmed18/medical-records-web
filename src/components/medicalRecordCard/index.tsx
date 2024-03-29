import clsx from 'clsx';
import moment, { Moment } from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from './MedicalRecordCard.module.css';

import DoctorMiniProfile from '../doctorMiniProfile';
import MedicalRecordDetails from '../medicalRecordDetails';

import { MedicalRecord } from '@/types/medicalRecords';

import CalenderIcon from '~/svg/calender.svg';
import CheckMarkIcon from '~/svg/check-mark-circle-icon.svg';

type props = {
  medicalRecord: MedicalRecord;
  prevDate: Moment | null;
  showDetails: (Content: React.ReactNode) => void;
  setActive?: (record: MedicalRecord) => void;
  currentActiceRecordId?: string;
};
const MedicalRecordCard = ({
  medicalRecord,
  prevDate,
  showDetails,
  setActive,
  currentActiceRecordId,
}: props) => {
  const [showDate, setShowDate] = useState(false);
  useEffect(() => {
    const currentDate = moment(medicalRecord.createdAt);
    if (!prevDate) return setShowDate(true);

    const willShowDate =
      currentDate.year() !== prevDate.year() ||
      currentDate.month() !== prevDate.month();
    setShowDate(willShowDate);
  }, [medicalRecord.createdAt, prevDate]);
  const Details = useMemo(
    () => <MedicalRecordDetails record={medicalRecord} />,
    [medicalRecord]
  );
  return (
    <li className={clsx('relative ml-6 p-2 md:p-5 ', styles.card)}>
      {showDate && (
        <span className='mx-auto mb-4 block w-fit rounded-lg bg-zinc-200 px-4 py-1 text-center text-lg text-gray-600'>
          {moment(medicalRecord.createdAt).format('MMMM YYYY')}
        </span>
      )}
      <span className='absolute -left-14 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-2 shadow-lg ring-4 ring-white'>
        <CalenderIcon className='fill-primary-200 text-4xl' />
      </span>
      <div
        className={twMerge(
          'relative ml-10 cursor-pointer rounded-lg bg-white p-7 shadow-md ring-1 ring-gray-200/75 hover:bg-gray-50'
        )}
        onClick={() => {
          showDetails(Details);
          setActive && setActive(medicalRecord);
        }}
      >
        {currentActiceRecordId === medicalRecord.id && (
          <CheckMarkIcon className='absolute right-4 h-10 w-10 fill-teal-700' />
        )}
        <h3 className='mb-10 text-3xl capitalize'>{medicalRecord.title}</h3>
        {medicalRecord.doctor && (
          <DoctorMiniProfile doctor={medicalRecord.doctor} />
        )}

        <div className='mb-16'></div>
        <span className='text-xl text-gray-400'>
          {moment(medicalRecord.createdAt).fromNow()}
        </span>
      </div>
    </li>
  );
};

export default MedicalRecordCard;
