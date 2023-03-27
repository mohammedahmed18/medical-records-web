import Link from 'next/link';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import protectedRoute from '@/components/common/protectedRoute';
import Container from '@/components/container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Content = () => {
  return (
    <Container>
      <Link href='/medical-records'>
        <Button variant='light' size='lg'>
          Medical Records
        </Button>
      </Link>
    </Container>
  );
};

function HomePage() {
  const ProtectedContent = protectedRoute(Content);
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <ProtectedContent />
      </main>
    </Layout>
  );
}

export default HomePage;
