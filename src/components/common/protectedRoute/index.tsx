import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/authContext';

type props = {
  children: JSX.Element;
  Skeleton?: () => JSX.Element;
  reverse?: boolean;
};
const ProtectedRoute = ({
  children,
  Skeleton,
  reverse,
}: props): JSX.Element => {
  const { isAnonymous, loading } = useAuth();
  const router = useRouter();
  const LoadingComponent = () => {
    if (typeof Skeleton !== 'undefined') return <Skeleton />;
    return <span>loading...</span>;
  };
  useEffect(() => {
    if (loading) return;
    // the authentication proccess is finished
    if (reverse && !isAnonymous) {
      // means that the user is logged in so he can't viewe this page like the login for example
      router.push('/');
    }
    if (isAnonymous && !reverse) {
      // if the user still Anonymous then redirect him to the login
      router.push('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading || isAnonymous) {
    return <LoadingComponent />;
  }

  //   to prevent the page flash
  return reverse && !isAnonymous ? <LoadingComponent /> : children;
};

export default ProtectedRoute;
