import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/authContext';

const protectedRoute = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Page: (props: any) => JSX.Element,
  Skeleton?: (() => JSX.Element) | null,
  reverse = false
) => {
  const Component = ({ ...props }) => {
    const { isAnonymous, loading, user } = useAuth();

    const router = useRouter();
    const { redirect } = router.query;

    const loggedIn = !isAnonymous;
    const LoadingComponent = () => {
      if (Skeleton) return <Skeleton />;
      // TODO: creat global loading
      return <h1>loading...</h1>;
    };
    const userData = reverse ? {} : { ...user };

    useEffect(() => {
      if (loading) return;
      // the authentication proccess is finished
      if (reverse && loggedIn) {
        // means that the user is logged in so he can't viewe this page like the login for example
        router.push(redirect?.toString() || '/');
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
    // return <LoadingComponent />

    //   to prevent the page flash
    return reverse && !isAnonymous ? (
      <LoadingComponent />
    ) : (
      <Page {...props} {...userData} />
    );
  };

  Component.displayName = 'protectedRoute';

  return Component;
};
export default protectedRoute;
