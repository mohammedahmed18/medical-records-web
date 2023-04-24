import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/buttons/Button';
import UserProfileImage from '@/components/common/UserProfileImage';
import Container from '@/components/container';
import GenerateQrCode from '@/components/generateQrCode';
import NavbarButton from '@/components/navbarButton';

import { useAuth } from '@/contexts/authContext';

import HomepageIcon from '~/svg/homepage.svg';
import LogoutIcon from '~/svg/logout.svg';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  if (user.isAnonymous) return null;
  return (
    <nav className='fixed inset-x-0 top-0 z-40 bg-white py-4 shadow-md'>
      <Container className='flex items-center justify-between'>
        <div className='flex'>
          <UserProfileImage src={user.image_src} size={40} />
        </div>

        {user.isDoctor && (
          <div>
            <Link href='/create-medical-record'>
              <Button variant='light' size='lg'>
                create a medical record
              </Button>
            </Link>
          </div>
        )}
        <div className='flex items-center gap-4'>
          <NavbarButton onClick={() => router.push('/')} Icon={HomepageIcon} />
          <GenerateQrCode />
          <NavbarButton onClick={logout} Icon={LogoutIcon} />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
