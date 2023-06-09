import * as React from 'react';

import Layout from '@components/layout';
import Seo from '@components/Seo';

import DoctorProtectedRoute from '@/components/common/doctorProtectedRoute';
import Container from '@/components/container';
import ScanUsersRecords from '@/components/doctors/scanUsersRecords';

function UserRecordsPage() {
  return (
    <Layout>
      <Seo templateTitle='User Records' />

      <main>
        <DoctorProtectedRoute>
          <Container narrow>
            <ScanUsersRecords />
          </Container>
        </DoctorProtectedRoute>
      </main>
    </Layout>
  );
}

export default UserRecordsPage;
