import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      {/* <Navbar /> */}
      <div className='mt-10'>{children}</div>
    </>
  );
}
