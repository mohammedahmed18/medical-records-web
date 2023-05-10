import Link from 'next/link';

import UserProfileImage from '@/components/common/UserProfileImage';
import { useAuth } from '@/contexts/authContext';
export type SingleDoctorSearch = {
  id: string;
  name: string;
  image_src: string;
  medicalSpecialization: string;
};
type Props = {
  doctor: SingleDoctorSearch;
};
const DoctorSearchCard = ({ doctor }: Props) => {
  const { id, image_src, name, medicalSpecialization } = doctor;
  const {
    user: { id: loggedInId },
  } = useAuth();
  return (
    <Link
      href={'/doctors/' + id}
      className='flex flex-col items-center rounded-2xl bg-base-100 py-4 px-6 shadow-lg hover:bg-base-200/50'
      style={{ transition: '0.5s' }}
    >
      <UserProfileImage
        className='my-3 w-full ease-in-out'
        src={image_src}
        alt='profile'
        size={300}
      />
      <span className='flex-1 text-center text-3xl'>
        {loggedInId === id ? '@you' : name}
      </span>
      <span className='mt-4 text-2xl text-zinc-400'>
        {medicalSpecialization}
      </span>
    </Link>
  );
};

export default DoctorSearchCard;
