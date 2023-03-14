import Link from 'next/link';
import * as React from 'react';

import TextButton from '@/components/buttons/TextButton';
import protectedRoute from '@/components/common/protectedRoute';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import HomepageSkeleton from '@/components/skeletons/homepage.skeleton';

import { useAuth, User } from '@/contexts/authContext';

type props = User;
function HomePage({ ...props }: props) {
  const { logout } = useAuth();
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <pre className='text-3xl'>{JSON.stringify(props, null, 2)}</pre>

        <Link
          href='/medical-records'
          className='rounded-lg bg-primary-500 py-7 px-4 text-lg font-bold text-white'
        >
          Medical Records
        </Link>
        <TextButton onClick={logout} className='bg-red-500 text-white'>
          logout
        </TextButton>
      </main>
    </Layout>
  );
}

export default protectedRoute(HomePage, HomepageSkeleton);
