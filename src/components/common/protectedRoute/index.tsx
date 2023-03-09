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
  const { redirect_url } = router.query;

  const loggedIn = !isAnonymous;
  const LoadingComponent = () => {
    if (typeof Skeleton !== 'undefined') return <Skeleton />;
    // TODO: creat global loading
    return <h1>loading...</h1>;
  };

  useEffect(() => {
    if (loading) return;
    // the authentication proccess is finished
    if (reverse && loggedIn) {
      // means that the user is logged in so he can't viewe this page like the login for example
      router.push(redirect_url?.toString() || '/');
    }
    if (isAnonymous && !reverse) {
      // if the user still Anonymous then redirect him to the login
      router.push(`/login?redirect=${router.pathname}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAnonymous]);

  if (loading || (isAnonymous && !reverse)) {
    return <LoadingComponent />;
  }

  //   to prevent the page flash
  return reverse && !isAnonymous ? <LoadingComponent /> : children;
};

export default ProtectedRoute;
