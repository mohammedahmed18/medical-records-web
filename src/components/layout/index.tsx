import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Put Header or Footer Here
  return (
    <>
      <div className={twMerge('mt-36', className)}>{children}</div>
    </>
  );
}
