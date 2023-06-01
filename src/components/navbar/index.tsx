import { useRouter } from 'next/router';
import React from 'react';

import UserProfileImage from '@components/common/UserProfileImage';
import Container from '@components/container';
import GenerateQrCode from '@components/generateQrCode';

import Tooltip from '@/components/common/tooltip';
import IconButton from '@/components/IconButton';
import { useAuth } from '@/contexts/authContext';

import AddDocumentIcon from '~/svg/add-document-icon.svg';
import HomepageIcon from '~/svg/homepage.svg';
import LogoutIcon from '~/svg/logout.svg';
import ScanIcon from '~/svg/scan-icon.svg';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  if (user.isAnonymous) return null;
  return (
    <nav className='fixed inset-x-0 top-0 z-40 bg-white/70 py-4 shadow-md backdrop-blur-md'>
      <Container className='flex items-center justify-between'>
        <div className='flex'>
          <UserProfileImage src={user.image_src} size={40} />
        </div>

        <div className='flex items-center gap-4'>
          {user.isDoctor && (
            <Tooltip title='create a medical record'>
              <IconButton
                onClick={() => router.push('/create-medical-record')}
                Icon={AddDocumentIcon}
              />
            </Tooltip>
          )}

          <Tooltip title='Homepage'>
            <IconButton onClick={() => router.push('/')} Icon={HomepageIcon} />
          </Tooltip>

          <Tooltip title='generate qr code'>
            <GenerateQrCode />
          </Tooltip>

          <Tooltip title='view records via qr code'>
            <IconButton
              onClick={() => {
                //
                router.push('/user-records');
              }}
              Icon={ScanIcon}
            />
          </Tooltip>
        </div>

        <Tooltip title='logout'>
          <IconButton onClick={logout} Icon={LogoutIcon} />
        </Tooltip>
      </Container>
    </nav>
  );
};

export default Navbar;
