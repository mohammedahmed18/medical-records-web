import Container from '@components/container';
import CreateRecordForm from '@components/doctors/createRecordForm';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import protectedRoute from '@/components/common/protectedRoute';

function CreateMedicalRecordPage() {
  return (
    <Layout>
      <Container narrow>
        <CreateRecordForm />
      </Container>
    </Layout>
  );
}
const SeoInfo = () => <Seo templateTitle='Create-medical-record' />;
export default protectedRoute(CreateMedicalRecordPage, {
  Seo: SeoInfo,
  requireDoctor: true,
});
