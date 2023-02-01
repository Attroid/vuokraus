import AccountTabs from 'components/commons/accountTabs';
import Marketplace from 'handlers/Marketplace';
import Button from 'react-bootstrap/Button';
import withSession from 'utils/sessionHook';

export default function Account({ favoriteProductCount }) {
  return (
    <div className='mt-4'>
      <AccountTabs favoriteProductCount={favoriteProductCount} />

      <h1 className='fs-5 fw-bold mt-5'>
        Sinulla ei ole julkaistuja ilmoituksia
      </h1>
      <p className='text-muted mt-5'>
        Jätä ilmoitus heti alla olevalla painikkeella tai milloin vain
        valitsemalla 'JÄTÄ ILMOITUS' ylävalikosta.{' '}
      </p>
      <Button className='mt-5' variant='danger'>
        Jätä ilmoitus
      </Button>
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
      favoriteProductCount: products.length,
    },
  };
});
