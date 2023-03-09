import * as React from 'react';

import ProtectedRoute from '@/components/common/protectedRoute';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import HomepageSkeleton from '@/components/skeletons/homepage.skeleton';

import { useAuth } from '@/contexts/authContext';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

function HomePage() {
  const { user } = useAuth();
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <h1 className='text-3xl'>{user.nationalId}</h1>
      </main>
    </Layout>
  );
}

export default function HomePageProtected() {
  return (
    <ProtectedRoute Skeleton={HomepageSkeleton}>
      <HomePage />
    </ProtectedRoute>
  );
}
