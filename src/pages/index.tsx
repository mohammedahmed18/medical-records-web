import Link from 'next/link';

import Button from '@components/buttons/Button';
import Container from '@components/container';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import protectedRoute from '@/components/common/protectedRoute';

const SeoInfo = () => <Seo templateTitle='Home' />;
function HomePage() {
  return (
    <Layout>
      <Container>
        <Link href='/medical-records'>
          <Button variant='light' size='lg'>
            Medical Records
          </Button>
        </Link>

        <Link href='/doctors'>
          <Button variant='light' size='lg'>
            Doctors
          </Button>
        </Link>
      </Container>
    </Layout>
  );
}

export default protectedRoute(HomePage, {
  Seo: SeoInfo,
});
