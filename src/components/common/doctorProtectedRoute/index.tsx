import protectedRoute from '@components/common/protectedRoute';

import { User } from '@/contexts/authContext';
import NotFoundPage from '@/pages/404';

type props = User & {
  children: JSX.Element;
};
const DoctorProtectedRoute = ({ isDoctor, children }: props): JSX.Element => {
  if (!isDoctor) return <NotFoundPage />;
  return children;
};

export default protectedRoute(DoctorProtectedRoute);
