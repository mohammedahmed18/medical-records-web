import DoctorProtectedRoute from '@components/common/doctorProtectedRoute';
import Container from '@components/container';
import CreateRecordForm from '@components/doctors/createRecordForm';
import Layout from '@components/layout';
import Seo from '@components/Seo';

function CreateMedicalRecordPage() {
  return (
    <Layout>
      <Seo templateTitle='Create-medical-record' />

      <main>
        <DoctorProtectedRoute>
          <Container>
            <CreateRecordForm />
          </Container>
        </DoctorProtectedRoute>
      </main>
    </Layout>
  );
}

export default CreateMedicalRecordPage;
