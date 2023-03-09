import ProtectedRoute from '@/components/common/protectedRoute';
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
export default function Login() {
  return (
    <ProtectedRoute reverse>
      <LoginPage />
    </ProtectedRoute>
  );
}
