import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

function Footer() {
  return (
    <Navbar
      bg='light'
      className='mt-5'
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '2.5rem',
      }}
    >
      <Container>
        <Navbar.Brand
          className='fs-6 user-select-none text-black fw-bold'
          as={Link}
          href='/'
        >
          Vuokraus.fi
        </Navbar.Brand>
        <Navbar.Text>&copy; Atte Koivukangas 2023</Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Footer;
