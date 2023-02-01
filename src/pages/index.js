import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import withSession from 'utils/sessionHook';

export default function Home() {
  return (
    <Container className='mt-5'>
      <h1 className='fs-4 fw-bold'>Tervetuloa!</h1>
      <p className='mt-4'>
        Aloita vuokraus.fi palvelun käyttäminen siirtymällä hakuun tai
        tunnistautumalla yläpalkista
      </p>
      <Button
        className='mt-4 rounded-0 w-25'
        as={Link}
        href='/search'
        variant='danger'
      >
        Haku
      </Button>
    </Container>
  );
}

export const getServerSideProps = withSession(async ({ req }) => {
  const { user } = req.session;

  return {
    props: {
      user,
    },
  };
});
