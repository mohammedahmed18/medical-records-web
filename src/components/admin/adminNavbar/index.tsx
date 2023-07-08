import Link from 'next/link';

import Button from '@/components/buttons/Button';
import UserProfileImage from '@/components/common/UserProfileImage';
import { useAuth } from '@/contexts/authContext';
import { getFirstName } from '@/utils/getFirstName';
const AdminNavbar = () => {
  const { user } = useAuth();
  return (
    <div className='flex justify-between bg-gray-100 px-4 py-3 shadow-lg'>
      <div className='flex items-center gap-3'>
        <UserProfileImage
          src={user.image_src}
          size={50}
          rounded
          className='ring-4 ring-primary-300'
        />
        <div className='flex flex-col'>
          <span className='text-2xl'>{getFirstName(user.name)}</span>
          <span className='text-muted text-lg font-bold'>Adminstrator</span>
        </div>
      </div>

      <div>
        <Link href='/'>
          <Button variant='light' className='shadow-lg' size='lg'>
            Back to main profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
