import { useRouter } from 'next/router';

import { DoctorProfile } from '@/api/doctors';
import CustomAreaChart from '@/components/common/customAreaChart';
import UserProfileImage from '@/components/common/UserProfileImage';
import DoctorReviews from '@/components/doctors/doctorReviews';
import RatingStars from '@/components/doctors/ratingStars.tsx';
import IconButton from '@/components/IconButton';

import SendMessageIcon from '~/svg/send-message-icon.svg';
import StethoScopeIcon from '~/svg/stethoscope-icon.svg';

type Props = {
  user: DoctorProfile;
  doctorId: string;
};
const DoctorProfile = (props: Props) => {
  const { name, image_src, medicalSpecialization, DoctorData, report } =
    props.user;

  const router = useRouter();
  return (
    <div className='flex flex-col items-center gap-7'>
      <UserProfileImage
        className='my-3 h-[300px] ease-in-out'
        src={image_src}
        alt='profile'
        size={300}
        rounded
      />
      <span className='mt-4 rounded-full text-4xl'>Dr. {name}</span>
      <span className='badge-primary badge badge-lg flex items-center gap-3 bg-primary-300 py-5 text-2xl shadow-lg'>
        <StethoScopeIcon className='fill-white' />
        {medicalSpecialization}
      </span>

      <RatingStars value={DoctorData?.totalRating || 0} size='lg' />

      {/* FIXME: repeated  */}
      {DoctorData?.hasChatEnabled && (
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/messaging?u=${props.doctorId}`);
          }}
          Icon={SendMessageIcon}
          className=' shadow-xl'
        />
      )}

      <div className='my-10 flex w-full flex-col items-center gap-7'>
        <h2 className='text-muted p-3 shadow-lg'>
          Dr. {name} Analytics this year
        </h2>
        {report && <CustomAreaChart data={report} />}
      </div>

      <DoctorReviews doctorId={props.doctorId} />
    </div>
  );
};

export default DoctorProfile;
