import protectedRoute from '@/components/common/protectedRoute';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/loginForm';
import Seo from '@/components/Seo';

function LoginPage() {
  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <LoginForm />
      </main>
    </Layout>
  );
}

export default protectedRoute(LoginPage, null, true);
