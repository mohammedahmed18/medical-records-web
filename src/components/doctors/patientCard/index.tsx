import UserProfileImage from '@components/common/UserProfileImage';

import { PatientQrInfo } from '@/types/user';

type props = {
  patient: PatientQrInfo;
};
const PatientCard = ({ patient }: props) => {
  return (
    <div className='my-7 w-fit rounded-2xl border-4  border-gray-100 p-4 shadow-lg'>
      <div className='flex flex-col items-center gap-3'>
        <UserProfileImage
          src={patient.image_src}
          size={40}
          className='ring-4'
        />

        <div className='grid grid-cols-2 gap-3 px-4 text-2xl'>
          <span>name</span>
          <span>{patient.name}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
