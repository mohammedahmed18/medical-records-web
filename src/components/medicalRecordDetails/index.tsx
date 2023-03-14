import moment from 'moment';
import Link from 'next/link';
import { CiCalendar, CiLink, CiMail, CiTextAlignCenter } from 'react-icons/ci';

import { MedicalRecord, MedicalRecordDetail } from '@/types/medicalRecords';
type props = {
  record: MedicalRecord;
};
const MedicalRecordDetails = ({ record }: props) => {
  const { title, details } = record;

  return (
    <div>
      <h3 className='text-4xl'>{title}</h3>
      <span className='mt-4 inline-block rounded-full bg-zinc-400 px-7 py-2 text-lg font-bold text-white'>
        {record.actionType}
      </span>
      <hr className='my-7' />

      <div className='flex flex-col gap-12'>
        {details.map((detail) => (
          <SingleDetail key={detail.key} detail={detail} />
        ))}
      </div>
    </div>
  );
};

export const SingleDetail = ({ detail }: { detail: MedicalRecordDetail }) => {
  if (detail.type === 'text') return TextDetail(detail.key, detail.value);
  if (detail.type === 'date') return DateDetail(detail.key, detail.value);
  if (detail.type === 'email') return EmailDetail(detail.key, detail.value);
  if (detail.type === 'url') return UrlDetail(detail.key, detail.value);
  return <></>;
};

const TextDetail = (key: string, value: string) => {
  return (
    <div className='flex flex-col'>
      <span className='mb-4 flex items-center gap-2 text-2xl font-bold'>
        <CiTextAlignCenter />
        {key}
      </span>
      <span className='break-words px-7 text-2xl leading-loose text-gray-600'>
        {value}
      </span>
    </div>
  );
};

const DateDetail = (key: string, value: string) => {
  return (
    <div className='flex flex-col'>
      <span className='mb-4 flex items-center gap-2 text-2xl font-bold '>
        <CiCalendar />
        {key}
      </span>
      <span className='break-words px-7 text-2xl leading-loose text-gray-600'>
        {moment(value).format('YYYY MMM d')}
      </span>
    </div>
  );
};

const EmailDetail = (key: string, value: string) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='mb-4 flex items-center gap-2 text-2xl font-bold '>
        <CiMail />
        {key}
      </span>
      <Link
        href={`mailto:${value}`}
        className='break-words px-7 text-2xl leading-loose text-primary-200'
      >
        {value}
      </Link>
    </div>
  );
};
const UrlDetail = (key: string, value: string) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='mb-4 flex items-center gap-2 text-2xl font-bold '>
        <CiLink />
        {key}
      </span>
      <Link
        href={value}
        target='_blank'
        className='break-words px-7 text-2xl leading-loose text-primary-200'
      >
        {value}
      </Link>
    </div>
  );
};

export default MedicalRecordDetails;
