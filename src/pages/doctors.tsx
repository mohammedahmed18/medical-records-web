import * as React from 'react';

import { ProtectedRoute } from '@components/common/protectedRoute';
import Container from '@components/container';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import DoctorsList from '@/components/doctors/doctorsList';

function Doctors() {
  return (
    <Layout>
      <Seo templateTitle='Doctors' />

      <main>
        <ProtectedRoute>
          <Container removeSpacing>
            <DoctorsList />
          </Container>
        </ProtectedRoute>
      </main>
    </Layout>
  );
}

export default Doctors;
