import React from 'react';

import Container from '@/components/container';
import GenerateQrCode from '@/components/generateQrCode';

const Navbar: React.FC = () => {
  return (
    <nav className='py-4 shadow-md'>
      <Container>
        <GenerateQrCode />
      </Container>
    </nav>
  );
};

export default Navbar;
