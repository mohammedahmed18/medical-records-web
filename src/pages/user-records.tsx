import * as React from 'react';

import { ProtectedRoute } from '@components/common/protectedRoute';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import ScanUsersRecords from '@/components/doctors/scanUsersRecords';

function UserRecordsPage() {
  return (
    <Layout>
      <Seo templateTitle='User records' />

      <main>
        <ProtectedRoute>
          <ScanUsersRecords />
        </ProtectedRoute>
      </main>
    </Layout>
  );
}

export default UserRecordsPage;
