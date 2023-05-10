import Link from 'next/link';
import * as React from 'react';

import Button from '@components/buttons/Button';
import { ProtectedRoute } from '@components/common/protectedRoute';
import Container from '@components/container';
import Layout from '@components/layout';
import Seo from '@components/Seo';

function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <ProtectedRoute>
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
        </ProtectedRoute>
      </main>
    </Layout>
  );
}

export default HomePage;
