import AccountTabs from 'components/commons/accountTabs';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import withSession from 'utils/sessionHook';
import Auth from 'handlers/Auth';
import axios from 'axios';
import { useRouter } from 'next/router';
import Marketplace from 'handlers/Marketplace';

export default function AccountInfo({
  user,
  loggedInDeviceCount,
  favoriteProductCount,
}) {
  const router = useRouter();

  const logoutFromAllDevices = async () => {
    try {
      await axios.post('/api/auth/logout-all');
      router.push('/login');
    } catch (e) {
      console.log('logout failed:', e);
    }
  };

  return (
    <div className='mt-4'>
      <AccountTabs favoriteProductCount={favoriteProductCount} />

      <Row className='px-3 mt-5'>
        <Col sm={5} className='bg-light rounded p-4 mt-2'>
          <h4 className='fw-bold'>Omat tiedot</h4>
          <table>
            <tbody>
              <tr>
                <td className='pt-2'>
                  <strong>Käyttäjänimi:</strong>
                </td>
                <td className='ps-4 pt-2'>{user.username}</td>
              </tr>
              <tr>
                <td className='pt-2'>
                  <strong>Salasana:</strong>
                </td>
                <td className='ps-4 pt-2'>********</td>
              </tr>
            </tbody>
          </table>
          <Button variant='danger' disabled className='mt-4'>
            Muokkaa tietoja
          </Button>
        </Col>
        <Col sm={7} className='ps-4 mt-2'>
          <Row dir='column'>
            <Col sm={12} className='bg-light rounded p-4'>
              <h4 className='fw-bold'>Asetukset</h4>
              <p>
                Olet kirjatunut sisään <b>{loggedInDeviceCount}</b> laitteella
              </p>
              <Button
                onClick={logoutFromAllDevices}
                variant='danger'
                className='mt-4'
              >
                Kirjaudu ulos kaikilta laitteilta
              </Button>
            </Col>
            <Col sm={12} className='bg-light rounded p-4 mt-3'>
              <h4 className='fw-bold'>Evästeet</h4>
              <p>
                Laitteellesi tallennetaan ainoastaan järjestelmän kannalta
                pakollinen tunnistautumiseväste.
              </p>
              <p>
                Tämä eväste ei sisällä mitään henkilökohtaista informaatiota
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export const getServerSideProps = withSession(async ({ req }) => {
  const { user } = req.session;

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const loggedInDeviceCount = await Auth.sessionCount(user.id);
  const products = await Marketplace.findUserAccountFavoriteProducts(user.id);

  return {
    props: {
      user,
      loggedInDeviceCount,
      favoriteProductCount: products.length,
    },
  };
});
