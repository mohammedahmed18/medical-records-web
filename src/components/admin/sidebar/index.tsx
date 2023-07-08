import styles from './styles.module.css';

import SidebarIcon from '@/components/admin/sidebarIcon';

import UsersIcon from '~/svg/users-icons.svg';
const AdminSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <SidebarIcon Icon={UsersIcon} label='Users' link='/admin/users' />
    </div>
  );
};

export default AdminSidebar;
