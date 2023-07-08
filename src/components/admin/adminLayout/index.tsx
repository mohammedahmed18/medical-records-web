import styles from './styles.module.css';

import AdminNavbar from '@/components/admin/adminNavbar';
import AdminSideBar from '@/components/admin/sidebar';

type Props = {
  children: React.ReactNode;
};
const AdminLayout = ({ children }: Props) => {
  return (
    <div className='flex h-screen w-full'>
      <AdminSideBar />
      <div className='flex w-full flex-col'>
        <AdminNavbar />
        <main className={styles.layout}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
