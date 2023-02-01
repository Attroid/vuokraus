import Form from 'react-bootstrap/Form';
import ErrorText from 'components/commons/ErrorText';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterForm({ onSubmit, errorText }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    onSubmit({
      username,
      password,
      passwordRepeat,
    });
  };

  return (
    <div className='d-flex justify-content-center py-5'>
      <Form
        onSubmit={handleSubmit}
        className='bg-light p-4 border rounded mb-5'
        style={{ width: 300 }}
      >
        <h1 className='text-center mb-4 fs-4'>Rekisteröidy</h1>

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

        <Form.Group className='mb-3' controlId='formBasicPasswordRepeat'>
          <Form.Label>Salasana uudestaan</Form.Label>
          <Form.Control
            type='password'
            placeholder='Salasana uudestaan'
            value={passwordRepeat}
            onChange={({ target }) => setPasswordRepeat(target.value)}
          />
        </Form.Group>

        <Button type='submit' className='w-100 mt-3' variant='danger'>
          Kirjaudu
        </Button>
        <div className='mt-2'>
          Vanha käyttäjä? <Link href='/login'>Kirjaudu sisään</Link>
        </div>
        <ErrorText content={errorText} />
      </Form>
    </div>
  );
}
