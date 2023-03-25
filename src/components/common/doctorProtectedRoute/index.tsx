import { useRouter } from 'next/router';
import { useEffect } from 'react';

import protectedRoute from '@/components/common/protectedRoute';

import { User } from '@/contexts/authContext';

type props = User & {
  children: JSX.Element;
};
const DoctorProtectedRoute = ({ isDoctor, children }: props): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    if (!isDoctor) router.push('/');
  }, [isDoctor, router]);
  if (!isDoctor) null;
  return children;
};

export default protectedRoute(DoctorProtectedRoute);
