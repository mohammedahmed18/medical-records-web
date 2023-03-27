import { ProtectedRoute } from '@/components/common/protectedRoute';
import LoginForm from '@/components/loginForm';
import Seo from '@/components/Seo';

function LoginPage() {
  return (
    <>
      <Seo templateTitle='Login' />

      <main>
        <ProtectedRoute reverse>
          <LoginForm />
        </ProtectedRoute>
      </main>
    </>
  );
}

export default LoginPage;
