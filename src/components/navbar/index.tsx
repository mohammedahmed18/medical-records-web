import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { useMobile } from '@/hooks/useMobile';
import { useTimeoutAsync } from '@/hooks/useTimeoutAsync';

import Container from '@components/container';

import { generateQrcode } from '@/api/users';
import NeonLoader from '@/components/common/NeonLoader';
import UserProfileImage from '@/components/common/UserProfileImage';
import GenerateQrModal from '@/components/generateQrCode/generateQrModal';
import IconButton from '@/components/IconButton';
import NextImage from '@/components/NextImage';
import { QRCODE_GENERATE } from '@/constant/queryKeys';
import { useAuth } from '@/contexts/authContext';
import { showToast } from '@/utils/toast';

import LogoV2 from '~/images/logo-v2.png';
import AddDocumentIcon from '~/svg/add-document-icon.svg';
import ArrowDown from '~/svg/arrow-down.svg';
import DoctorTeamIcon from '~/svg/doctor-team-icon.svg';
import HomePageIcon from '~/svg/homepage.svg';
import LogoutIcon from '~/svg/logout.svg';
import ChatIcon from '~/svg/message-bubble-icon.svg';
// import GenerateQrCode from '@/components/generateQrCode';
import QrCodeIcon from '~/svg/qr-code.svg';
import RecordsIcon from '~/svg/records-icon.svg';
import ScanIcon from '~/svg/scan-icon.svg';
import SendMessageIcon from '~/svg/send-message-icon.svg';

type NavbarButtonProps = {
  label: string;
  href: string;
  Icon: (props: { className: string }) => JSX.Element;
  setActive: (width: number, offset: number) => void;
};
const NavbarButton = (props: NavbarButtonProps) => {
  const router = useRouter();
  const { deviceWidth } = useMobile();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { Icon, href, label, setActive } = props;
  const handleAvtice = () => {
    // handle the active div
    const refCurrent = linkRef.current;
    if (!refCurrent) return;

    const width = refCurrent.clientWidth;

    setActive(width, refCurrent.offsetLeft);
  };

  const isActive = href === router.pathname;
  useEffect(() => {
    if (isActive) handleAvtice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, deviceWidth]);

  return (
    <Link
      ref={linkRef}
      className='z-[2] flex cursor-pointer flex-col items-center gap-3 p-4 text-2xl font-semibold'
      href={href}
    >
      <Icon className='h-8 w-8' />

      <span className='hidden text-center md:block'>{label}</span>
    </Link>
  );
};

type Props = {
  loading: boolean;
};
const Navbar: React.FC<Props> = ({ loading }) => {
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
      label: 'Home',
      href: '/',
      Icon: HomePageIcon,
      requireDoctor: false,
    },
    {
      label: 'Records',
      href: '/medical-records',
      Icon: RecordsIcon,
    },
    {
      label: 'create a record',
      href: '/create-medical-record',
      Icon: AddDocumentIcon,
      requireDoctor: true,
    },
    {
      label: 'view patient info',
      href: '/user-records',
      Icon: ScanIcon,
      requireDoctor: true,
    },
    {
      label: 'Doctors',
      href: '/doctors',
      Icon: DoctorTeamIcon,
    },
    {
      label: 'Chat',
      href: '/messaging',
      Icon: ChatIcon,
      requireDoctor: false,
    },
  ];

  //////////////////////////// QR CODE

  const QR_LIFETIME_MINS = 0.5;

  const [showQrcode, setShowQrcode] = useState(false);
  const [canRefresh, setCanRefresh] = useState(true);

  const { set } = useTimeoutAsync(() => {
    setCanRefresh(true);
  }, 1000 * 60 * QR_LIFETIME_MINS);

  const {
    data: qrcode,
    refetch,
    isRefetching,
    status,
  } = useQuery({
    queryKey: QRCODE_GENERATE,
    queryFn: generateQrcode,
    enabled: false,
    keepPreviousData: false,
  });

  const handleGenerateQrcode = async () => {
    if (!canRefresh) {
      return showToast(
        `you must wait ${
          QR_LIFETIME_MINS < 1
            ? QR_LIFETIME_MINS * 60 + ' seconds'
            : QR_LIFETIME_MINS + ' minute(s)'
        } to refresh the qr code`,
        'error'
      );
    }
    setCanRefresh(false);
    refetch();
  };
  const handleShowQrModal = () => {
    setShowQrcode(true);
    if (!qrcode) handleGenerateQrcode();
  };

  useEffect(() => {
    if (!canRefresh) set();
  }, [canRefresh, set]);
  ////////////////////////////////////////// end qr code

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
    <nav className='fixed inset-x-0 top-0 z-40 py-3 backdrop-blur-md md:py-0'>
      <Container className='flex items-center justify-between'>
        <Link href='/' className='center-content rounded-2xl px-10'>
          {/* <Logo className='h-20 w-20 ' /> */}
          <NextImage src={LogoV2} width={70} height={70} alt='Logo' />
          <h2 className='hidden bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-3xl text-transparent md:block'>
            Medical records
          </h2>
          {/* <UserProfileImage src={user.image_src} size={40} /> */}
        </Link>

        <div className='relative ml-4 flex items-center gap-3 md:gap-4 lg:gap-6'>
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

          <div className='dropdown-end dropdown'>
            <label>
              <div
                tabIndex={0}
                className='flex cursor-pointer items-center gap-4 rounded-lg px-5 py-3 transition-colors hover:bg-gray-100'
              >
                <ArrowDown className='hidden md:block' />
                <UserProfileImage src={user.image_src} size={40} rounded />
              </div>
            </label>

            <ul
              tabIndex={0}
              className='dropdown-content menu rounded-box w-80 gap-4 bg-white px-2 py-5'
            >
              {user.isDoctor && (
                <li>
                  <Link
                    className='bg-primary-200 text-2xl font-bold text-white'
                    href={`/doctors/${user.id}`}
                  >
                    Your doctor profile
                  </Link>
                </li>
              )}
              <li>
                <IconButton
                  onClick={handleShowQrModal}
                  Icon={QrCodeIcon}
                  className='center-content'
                >
                  Generate QR code
                </IconButton>
              </li>
              <li>
                {/* <GenerateQrCode /> */}
                <IconButton
                  onClick={() => router.push(`/messaging?u=${user.id}`)}
                  Icon={SendMessageIcon}
                  className='center-content'
                >
                  Message yourself
                </IconButton>
              </li>
              <li>
                <IconButton
                  onClick={logout}
                  Icon={LogoutIcon}
                  className='center-content'
                >
                  Logout
                </IconButton>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className='flex items-center'>
          <Tooltip direction='tooltip-bottom' title='generate qr code'>
            <GenerateQrCode />
          </Tooltip>
          <Tooltip direction='tooltip-bottom' title='logout' className='mx-7'>
            <IconButton onClick={logout} Icon={LogoutIcon} />
          </Tooltip>
        </div> */}
      </Container>
      {loading && <NeonLoader />}

      <GenerateQrModal
        handleGenerateQrcode={handleGenerateQrcode}
        loading={status === 'loading'}
        isRefetching={isRefetching}
        onClose={() => setShowQrcode(false)}
        qrcode={qrcode}
        showQrcode={showQrcode}
      />
    </nav>
  );
};

export default Navbar;
