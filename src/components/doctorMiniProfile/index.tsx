import Link from 'next/link';

import UserProfileImage from '@components/common/UserProfileImage';

type props = {
  doctor: Partial<{
    id: string;
    image_src: string;
    name: string;
    medicalSpecialization?: string;
    email?: string;
  }>;
};
const DoctorMiniProfile = ({ doctor }: props) => {
  const { image_src, name, medicalSpecialization, id } = doctor;
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      href={`/doctors/${id}`}
      className='my-3 flex w-fit gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100'
    >
      <UserProfileImage src={image_src} alt={name} />
      <div className='flex flex-col gap-2'>
        <span className='text-lg font-semibold'>DR. {name}</span>
        <span className='font-semibold text-gray-400'>
          {medicalSpecialization}
        </span>
      </div>
    </Link>
  );
};

export default DoctorMiniProfile;
