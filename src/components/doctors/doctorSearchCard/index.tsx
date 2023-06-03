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
import LongText from '@/components/LongText';

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
      className='relative mb-10 flex items-center gap-3 rounded-2xl bg-base-100 py-4 px-6 shadow-lg hover:bg-base-200/50'
      style={{ transition: '0.5s' }}
    >
      <UserProfileImage
        className='my-3 ease-in-out'
        src={image_src}
        alt='profile'
        size={90}
        rounded
      />
      <div className='flex flex-1 flex-col'>
        <span className='flex-1 break-all text-2xl'>
          {loggedInId === id ? (
            <span className='text-secondary'>@you</span>
          ) : (
            <LongText text={name} maxChars={70} />
          )}
        </span>

        <span className='mt-2 text-2xl text-zinc-400'>
          {medicalSpecialization}
        </span>

        {totalRating !== 0 && (
          <RatingStarts
            value={totalRating}
            maxValue={5}
            reviewsCount={_count.Ratings}
          />
        )}
      </div>
      {hasChatEnabled && (
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/messaging?u=${id}`);
          }}
          Icon={SendMessageIcon}
          className='absolute right-0 -bottom-10 shadow-xl'
        />
      )}
    </Link>
  );
};

export default DoctorSearchCard;
