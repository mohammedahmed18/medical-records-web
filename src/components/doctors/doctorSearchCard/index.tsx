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
  DoctorData: {
    hasChatEnabled: boolean;
    totalRating: number;
  };
  _count: {
    Ratings: number;
  };
};
type Props = {
  doctor: SingleDoctorSearch;
};
import RatingStarts from '@/components/doctors/ratingStars.tsx';

import SendMessageIcon from '~/svg/send-message-icon.svg';

const DoctorSearchCard = ({ doctor }: Props) => {
  const { id, image_src, name, medicalSpecialization, _count } = doctor;
  const {
    user: { id: loggedInId },
  } = useAuth();
  const router = useRouter();

  const { hasChatEnabled, totalRating } = doctor.DoctorData;
  return (
    <Link
      href={'/doctors/' + id}
      className='relative flex flex-col items-center gap-3 rounded-2xl bg-base-100 py-4 px-6 shadow-lg hover:bg-base-200/50'
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
      {totalRating !== 0 && (
        <RatingStarts
          value={totalRating}
          maxValue={5}
          reviewsCount={_count.Ratings}
        />
      )}

      <span className='mt-4 text-2xl text-zinc-400'>
        {medicalSpecialization}
      </span>

      {hasChatEnabled && (
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/messaging?u=${id}`);
          }}
          Icon={SendMessageIcon}
          className='absolute right-0 shadow-xl'
        />
      )}
    </Link>
  );
};

export default DoctorSearchCard;
