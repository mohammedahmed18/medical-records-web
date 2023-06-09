import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { useMobile } from '@/hooks/useMobile';

import UserProfileImage from '@components/common/UserProfileImage';
import Container from '@components/container';

import Tooltip from '@/components/common/tooltip';
import GenerateQrCode from '@/components/generateQrCode';
import IconButton from '@/components/IconButton';
import { useAuth } from '@/contexts/authContext';

import AddDocumentIcon from '~/svg/add-document-icon.svg';
import HomePageIcon from '~/svg/homepage.svg';
import LogoutIcon from '~/svg/logout.svg';
import ChatIcon from '~/svg/message-bubble-icon.svg';
import ScanIcon from '~/svg/scan-icon.svg';

type NavbarButtonProps = {
  label: string;
  href: string;
  Icon: (props: { className: string }) => JSX.Element;
  setActive: (width: number, offset: number) => void;
};
const NavbarButton = (props: NavbarButtonProps) => {
  const router = useRouter();
  const { deviceWidth } = useMobile();
  const linkRef = useRef<HTMLSpanElement>(null);

  const handleAvtice = () => {
    // handle the active div
    const refCurrent = linkRef.current;
    if (!refCurrent) return;

    const width = refCurrent.clientWidth;

    props.setActive(width, refCurrent.offsetLeft);
  };

  const isActive = props.href === router.pathname;
  useEffect(() => {
    if (isActive) handleAvtice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, deviceWidth]);
  const { Icon } = props;
  return (
    <span
      ref={linkRef}
      className='z-[2] flex cursor-pointer flex-col items-center gap-3 p-4 text-2xl font-semibold'
      onClick={() => {
        if (props.href) router.push(props.href);
        handleAvtice();
      }}
    >
      <Icon className='h-8 w-8' />

      <span className='hidden md:block'>{props.label}</span>
    </span>
  );
};

const Navbar: React.FC = () => {
  const [activeContainerStyle, setActiveContainerStyle] = useState<{
    width: number;
    offset: number;
  }>({ width: 0, offset: 0 });
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSetActive = (width: number, offset: number) =>
    setActiveContainerStyle({ width, offset });

  const links = [
    {
      label: 'Homepage',
      href: '/',
      Icon: HomePageIcon,
      requireDoctor: false,
    },
    {
      label: 'create medical record',
      href: '/create-medical-record',
      Icon: AddDocumentIcon,
      requireDoctor: true,
    },
    {
      label: 'scan patient qr code',
      href: '/user-records',
      Icon: ScanIcon,
      requireDoctor: true,
    },
    {
      label: 'Messages',
      href: '/messaging',
      Icon: ChatIcon,
      requireDoctor: false,
    },
  ];

  useEffect(() => {
    if (!links.some((v) => v.href === router.pathname)) {
      // no match
      setActiveContainerStyle({ offset: 0, width: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const isDoctor = user.isDoctor;

  if (user.isAnonymous) return null;
  return (
    <nav className='fixed inset-x-0 top-0 z-40 bg-gray-200/20 py-3 shadow-sm backdrop-blur-md md:py-0'>
      <Container className='flex items-center justify-between'>
        <div className='flex'>
          <UserProfileImage src={user.image_src} size={40} />
        </div>

        <div className='relative ml-4 flex items-center gap-7'>
          <div
            className='absolute bottom-0 h-2 rounded-2xl bg-primary-100 transition-all duration-300 ease-in-out'
            style={{
              width: activeContainerStyle.width,
              left: activeContainerStyle.offset,
            }}
          />

          {links.map((link) =>
            link.requireDoctor && !isDoctor ? null : (
              <NavbarButton
                key={link.label}
                label={link.label}
                href={link.href}
                Icon={link.Icon}
                setActive={handleSetActive}
              />
            )
          )}
        </div>

        <div className='flex items-center'>
          <Tooltip title='generate qr code'>
            <GenerateQrCode />
          </Tooltip>
          <Tooltip title='logout' className='mx-7'>
            <IconButton onClick={logout} Icon={LogoutIcon} />
          </Tooltip>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
