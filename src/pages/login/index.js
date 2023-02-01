import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoginForm from 'components/login-page/LoginForm';
import withSession from 'utils/sessionHook';

export default function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async ({ username, password }) => {
    try {
      await axios.post('/api/auth/login', { username, password });
      router.reload(window.location.pathname);
    } catch (error) {
      setLoginError('Virheellinen käyttäjätunnus tai salasana');
    }
  };

  return (
    <div className='d-flex justify-content-center py-5'>
      <LoginForm onSubmit={handleSubmit} errorText={loginError} />
    </div>
  );
}

export const getServerSideProps = withSession(({ req }) => {
  const { user } = req.session;

  if (user) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
