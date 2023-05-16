import Link from 'next/link';
import { useRouter } from 'next/router';

import UserProfileImage from '@/components/common/UserProfileImage';
import IconButton from '@/components/IconButton';
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
import SendMessageIcon from '~/svg/send-message-icon.svg';

const DoctorSearchCard = ({ doctor }: Props) => {
  const { id, image_src, name, medicalSpecialization } = doctor;
  const {
    user: { id: loggedInId },
  } = useAuth();
  const router = useRouter();
  return (
    <Link
      href={'/doctors/' + id}
      className='flex flex-col items-center gap-3 rounded-2xl bg-base-100 py-4 px-6 shadow-lg hover:bg-base-200/50'
      style={{ transition: '0.5s' }}
    >
      <UserProfileImage
        className='my-3 w-full ease-in-out'
        src={image_src}
        alt='profile'
        size={300}
      />
      <span className='flex-1 break-all text-center text-2xl'>
        {loggedInId === id ? (
          <span className='text-secondary'>@you</span>
        ) : (
          name
        )}
      </span>
      <span className='mt-4 text-2xl text-zinc-400'>
        {medicalSpecialization}
      </span>

      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(`/messaging?u=${id}`);
        }}
        Icon={SendMessageIcon}
      />
    </Link>
  );
};

export default DoctorSearchCard;
