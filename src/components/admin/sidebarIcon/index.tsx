import Link from 'next/link';

import styles from './styles.module.css';

import Tooltip from '@/components/common/tooltip';
const SidebarIcon = ({
  Icon,
  label,
  link,
}: {
  Icon: (props: { className?: string }) => JSX.Element;
  label: string;
  link: string;
}) => {
  return (
    <>
      <Tooltip title={label} direction='tooltip-right'>
        <Link href={link} className={styles.sidebar_icon + ' group'}>
          <div>
            <Icon className='h-10 w-10 fill-white' />
          </div>
        </Link>
      </Tooltip>

      <div className={styles.sidebar_hr}></div>
    </>
  );
};

export default SidebarIcon;
