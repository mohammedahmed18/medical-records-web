import * as React from 'react';

import Layout from '@components/layout';
import Seo from '@components/Seo';

import protectedRoute from '@/components/common/protectedRoute';
import Container from '@/components/container';
import ScanUsersRecords from '@/components/doctors/scanUsersRecords';

const SeoInfo = () => <Seo templateTitle='User Records' />;
function UserRecordsPage() {
  return (
    <Layout>
      <Container narrow>
        <ScanUsersRecords />
      </Container>
    </Layout>
  );
}

export default protectedRoute(UserRecordsPage, {
  Seo: SeoInfo,
  requireDoctor: true,
});
