import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/loginForm';
import Seo from '@/components/Seo';

export default function LoginPage() {
  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <LoginForm />
      </main>
    </Layout>
  );
}
