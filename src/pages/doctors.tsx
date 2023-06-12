import * as React from 'react';

import protectedRoute from '@components/common/protectedRoute';
import Container from '@components/container';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import DoctorsList from '@/components/doctors/doctorsList';

function DoctorsPage() {
  return (
    <Layout>
      <Container removeSpacing>
        <DoctorsList />
      </Container>
    </Layout>
  );
}

const SeoInfo = () => <Seo templateTitle='Doctors' />;

export default protectedRoute(DoctorsPage, {
  Seo: SeoInfo,
});
