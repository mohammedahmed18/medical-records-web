import protectedRoute from '@components/common/protectedRoute';
import LoginForm from '@components/loginForm';
import Seo from '@components/Seo';

const SeoInfo = () => <Seo templateTitle='Login' />;
function LoginPage() {
  return <LoginForm />;
}

export default protectedRoute(LoginPage, { reverse: true, Seo: SeoInfo });
