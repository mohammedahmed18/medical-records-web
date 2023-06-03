import * as React from 'react';

import Layout from '@components/layout';
import Seo from '@components/Seo';

import DoctorProtectedRoute from '@/components/common/doctorProtectedRoute';
import ScanUsersRecords from '@/components/doctors/scanUsersRecords';

function UserRecordsPage() {
  return (
    <Layout>
      <Seo templateTitle='User Records' />

      <main>
        <DoctorProtectedRoute>
          <ScanUsersRecords />
        </DoctorProtectedRoute>
      </main>
    </Layout>
  );
}

export default UserRecordsPage;
