import protectedRoute from '@components/common/protectedRoute';
import LoginForm from '@components/loginForm';
import Seo from '@components/Seo';

import Layout from '@/components/layout';

const SeoInfo = () => <Seo templateTitle='Login' />;
function LoginPage() {
  return (
    <Layout className='mt-10'>
      <LoginForm />
    </Layout>
  );
}

export default protectedRoute(LoginPage, { reverse: true, Seo: SeoInfo });
