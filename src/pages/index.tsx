import * as React from 'react';

import TextButton from '@/components/buttons/TextButton';
import protectedRoute from '@/components/common/protectedRoute';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import HomepageSkeleton from '@/components/skeletons/homepage.skeleton';

import { useAuth, User } from '@/contexts/authContext';

type props = User;
function HomePage({ gender }: props) {
  const { logout } = useAuth();
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <h1 className='text-3xl'>{gender}</h1>
        <TextButton onClick={logout} className='bg-indigo-800 text-white'>
          logout
        </TextButton>
      </main>
    </Layout>
  );
}

export default protectedRoute(HomePage, HomepageSkeleton);
