import Image from 'next/image';

import DefaultImage from '@/constant/ui';

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
  const { image_src, name, medicalSpecialization } = doctor;
  return (
    <div className='my-3 flex w-fit gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100'>
      <Image
        width={70}
        height={70}
        className='h-20 w-20 rounded-full object-cover ring-4 ring-primary-50'
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
