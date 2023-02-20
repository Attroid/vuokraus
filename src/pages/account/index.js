import AccountTabs from 'components/commons/accountTabs';
import Marketplace from 'handlers/Marketplace';
import Button from 'react-bootstrap/Button';
import withSession from 'utils/sessionHook';
import ProductCard from 'components/account-favourites-page/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function Account({ favoriteProductCount, ownProducts }) {
  const router = useRouter();

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-4'>
      <AccountTabs favoriteProductCount={favoriteProductCount} />

      <h1 className='fs-5 fw-bold mt-5'>
        {ownProducts.length === 0
          ? 'Sinulla ei ole julkaistuja ilmoituksia'
          : 'Omat ilmoitukset'}
      </h1>
      <p className='text-muted mt-5'>
        Jätä ilmoitus heti alla olevalla painikkeella tai milloin vain
        valitsemalla 'JÄTÄ ILMOITUS' ylävalikosta.{' '}
      </p>

      <Button
        as={Link}
        href='/account/create-product'
        className='mt-4 mb-4'
        variant='danger'
      >
        Jätä ilmoitus
      </Button>

      <Row>
        {ownProducts.map((product) => (
          <Col key={product.id} sm={3} className='p-2'>
            <ProductCard
              product={product}
              onEdit={() => {}}
              onDelete={() => deleteProduct(product.id)}
            />
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

  const favoriteProducts = await Marketplace.findUserAccountFavoriteProducts(
    user.id
  );
  const ownProducts = await Marketplace.findUserAccountOwnProducts(user.id);

  return {
    props: {
      user,
      favoriteProductCount: favoriteProducts.length,
      ownProducts,
    },
  };
});
