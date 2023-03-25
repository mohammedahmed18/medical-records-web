import Link from 'next/link';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import protectedRoute from '@/components/common/protectedRoute';
import Container from '@/components/container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <Container>
          <Link href='/medical-records'>
            <Button variant='light' size='lg'>
              Medical Records
            </Button>
          </Link>
        </Container>
      </main>
    </Layout>
  );
}

export default protectedRoute(HomePage);
