import AccountTabs from 'components/commons/accountTabs';
import Marketplace from 'handlers/Marketplace';
import Button from 'react-bootstrap/Button';
import withSession from 'utils/sessionHook';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function AccountFavourites({ products, favoriteProductCount }) {
  const router = useRouter();

  const handleFavoriteRemove = async (productId) => {
    try {
      await axios.post(`/api/products/${productId}/favorite`);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-4'>
      <AccountTabs favoriteProductCount={favoriteProductCount} />
      <h1 className='fs-5 fw-bold mt-5'>Suosikit</h1>
      {products.length === 0 && (
        <>
          <p className='text-muted mt-5'>
            Ei tallennettuja suosikkeja. Tallenna ilmoituksia napauttamalla
            sydänkuvaketta ilmoitussivulla.
          </p>
          <Button className='mt-5' variant='danger' as={Link} href='/search'>
            Tee uusi haku
          </Button>
        </>
      )}

      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={3} className='p-2'>
            <Card className='pt-3'>
              <Link
                href={`/products/${product.id}`}
                className='d-flex justify-content-center'
              >
                <Image
                  as={Image}
                  width={160}
                  height={120}
                  style={{ width: 'auto' }}
                  alt={product.description}
                  src={'https://loremflickr.com/160/120/' + product.imageUrl}
                />
              </Link>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </Card.Title>
                <Card.Text>{product.price} €</Card.Text>
                <Button
                  variant='danger'
                  onClick={() => handleFavoriteRemove(product.id)}
                >
                  Poista
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
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

  const products = await Marketplace.findUserAccountFavoriteProducts(user.id);

  return {
    props: {
      user,
      products,
      favoriteProductCount: products.length,
    },
  };
});
