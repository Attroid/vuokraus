import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function AppBar({ activeUser }) {
  const router = useRouter();
  const [profileSection, setProfileSection] = useState(null);

  useEffect(() => {
    let newProfileSection = null;

    if (['/login', '/404'].includes(router.pathname) === false) {
      newProfileSection = activeUser ? (
        <div className='d-flex align-items-center'>
          {router.pathname !== '/account/create-product' && (
            <Button
              variant='outline-primary me-4'
              as={Link}
              href='/account/create-product'
            >
              Jätä ilmoitus
            </Button>
          )}

          <Link href='/account?'>{activeUser.username}</Link>
        </div>
      ) : (
        <div>
          <Link href='/login'>Kirjaudu sisään</Link>
          {' / '}
          <Link href='/register'>Rekisteröidy</Link>
        </div>
      );
    }

    setProfileSection(newProfileSection);
  }, [router.pathname]);

  return (
    <Navbar className='border-bottom'>
      <Container>
        <div className='d-flex align-items-center'>
          <Navbar.Brand
            className='user-select-none text-danger fw-bold fs-4'
            as={Link}
            href='/'
          >
            Vuokraus.fi
          </Navbar.Brand>
          <Link className='ms-4' href='/search?t=1|3|2|4|5'>
            Kaikki ilmoitukset
          </Link>
        </div>
        {profileSection}
      </Container>
    </Navbar>
  );
}

export default AppBar;
