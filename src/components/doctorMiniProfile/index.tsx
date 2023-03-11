import Image from 'next/image';

import DefaultImage from '~/images/default-user.png';
type props = Partial<{
  id: string;
  image_src: string;
  name: string;
  medicalSpecialization?: string;
  email?: string;
}>;
const DoctorMiniProfile = ({
  image_src,
  name,
  medicalSpecialization,
}: props) => {
  return (
    <div className='my-3 flex w-fit gap-4 rounded-2xl p-4 shadow-sm'>
      <Image
        width={40}
        height={40}
        className='rounded-full ring-2'
        src={image_src || DefaultImage}
        alt={name || 'doctor profile image'}
      />
      <div className='flex flex-col gap-2'>
        <span className='text-lg font-semibold'>DR. {name}</span>
        <span className='font-semibold text-gray-400'>
          {medicalSpecialization}
        </span>
      </div>
    </div>
  );
};

export default DoctorMiniProfile;
