import withSession from 'utils/sessionHook';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import RegisterForm from 'components/register-page/RegisterForm';

export default function Register() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState('');

  const handleSubmit = async ({ username, password, passwordRepeat }) => {
    if (password !== passwordRepeat) {
      return setRegisterError('Salasanat eivät täsmää');
    }

    try {
      await axios.post('/api/auth/register', { username, password });
      router.reload(window.location.pathname);
    } catch (error) {
      setRegisterError('Käyttäjänimi on jo varattu');
    }
  };

  return (
    <div className='d-flex justify-content-center py-5'>
      <RegisterForm onSubmit={handleSubmit} errorText={registerError} />
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
