import * as React from 'react';

import Navbar from '@/components/navbar';

export default function Layout({
  children,
  withNavbar = true,
}: {
  children: React.ReactNode;
  withNavbar?: boolean;
}) {
  // Put Header or Footer Here
  return (
    <>
      {withNavbar && <Navbar />}
      <div className='mt-28'>{children}</div>
    </>
  );
}
