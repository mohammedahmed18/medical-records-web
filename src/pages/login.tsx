import protectedRoute from '@/components/common/protectedRoute';
import LoginForm from '@/components/loginForm';
import Seo from '@/components/Seo';

function LoginPage() {
  return (
    <>
      <Seo templateTitle='Login' />

      <main>
        <LoginForm />
      </main>
    </>
  );
}

export default protectedRoute(LoginPage, null, true);
