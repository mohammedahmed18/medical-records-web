import protectedRoute from '@components/common/protectedRoute';

type props = {
  children: () => JSX.Element;
  Skeleton?: (() => JSX.Element) | null;
  reverse?: boolean;
};
export const ProtectedRoute = ({
  children,
  Skeleton,
  reverse,
}: props): JSX.Element => {
  const Content = protectedRoute(children, Skeleton, !!reverse || false);
  return <Content />;
};
