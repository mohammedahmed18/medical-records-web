import * as React from 'react';

import DoctorProtectedRoute from '@/components/common/doctorProtectedRoute';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function CreateMedicalRecordPage() {
  return (
    <DoctorProtectedRoute>
      <Layout>
        <Seo templateTitle='Create-medical-record' />

        <main></main>
      </Layout>
    </DoctorProtectedRoute>
  );
}

export default CreateMedicalRecordPage;
