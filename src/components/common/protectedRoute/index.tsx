import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import GlobalLoading from '@components/common/globalLoading';

import { useAuth } from '@/contexts/authContext';
import NotFoundPage from '@/pages/404';

// const PageComp = ({ ...props }) => {
//   const { Page } = props;

//   console.log(typeof Page);

//   if (typeof Page === 'function') {
//     return <Page {...props} />;
//   }
//   return Page; // please note that when using the protected route without the HOC it won't have the user data so you have to get them from the context.
// };

const protectedRoute = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Page: (props: any) => JSX.Element,
  options: {
    Skeleton?: (() => JSX.Element) | null;
    Seo?: React.ElementType;
    reverse?: boolean;
    requireDoctor?: boolean;
  }
) => {
  const { Seo, Skeleton, reverse = false, requireDoctor = false } = options;

  const Component = ({ ...props }) => {
    const { isAnonymous, loading, user } = useAuth();
    const router = useRouter();
    const { redirect } = router.query;

    const loggedIn = !isAnonymous;
    const LoadingComponent = () => {
      if (Skeleton) return <Skeleton />;
      return <GlobalLoading />;
    };
    const userData = reverse ? {} : user;

    useEffect(() => {
      if (loading) return;
      // the authentication proccess is finished
      if (reverse && loggedIn) {
        // means that the user is logged in so he can't viewe this page like the login for example
        router.push(redirect?.toString() || '/');
      }
      if (isAnonymous && !reverse) {
        // if the user still Anonymous then redirect him to the login
        router.push(`/login?redirect=${router.asPath}`);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, isAnonymous]);

    if (loading || (isAnonymous && !reverse)) {
      return (
        <>
          {Seo && <Seo />}
          <main>
            <LoadingComponent />
          </main>
        </>
      );
    }
    // return <LoadingComponent />

    //   to prevent the page flash
    if (reverse && !isAnonymous) <LoadingComponent />;

    // the user is authenticated

    if (requireDoctor && !user.isDoctor) return <NotFoundPage />;
    return (
      <>
        {Seo && <Seo />}
        <main>
          <Page {...props} {...userData} />;
        </main>
      </>
    );
  };

  Component.displayName = 'protectedRoute';

  return Component;
};
export default protectedRoute;
