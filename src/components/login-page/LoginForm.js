import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ErrorText from 'components/commons/ErrorText';
import Link from 'next/link';

export default function LoginForm({ onSubmit, errorText }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();

    onSubmit({
      username,
      password,
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className='bg-light p-4 border rounded mb-5'
      style={{ width: 300 }}
    >
      <h1 className='text-center mb-4 fs-4'>Kirjaudu sisään</h1>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Käyttäjänimi</Form.Label>
        <Form.Control
          type='text'
          placeholder='Syötä käyttäjänimi'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Salasana</Form.Label>
        <Form.Control
          type='password'
          placeholder='Salasana'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>

      <Button type='submit' className='w-100 mt-3' variant='danger'>
        Kirjaudu
      </Button>
      <div className='mt-2'>
        Uusi käyttäjä? <Link href='/register'>Rekisteröidy</Link>
      </div>
      <ErrorText content={errorText} />
    </Form>
  );
}
