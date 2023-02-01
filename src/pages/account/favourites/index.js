import AccountTabs from 'components/commons/accountTabs';
import Button from 'react-bootstrap/Button';
import withSession from 'utils/sessionHook';

export default function AccountFavourites() {
  return (
    <div className='mt-4'>
      <AccountTabs />

      <h1 className='fs-5 fw-bold mt-5'>Suosikit</h1>
      <p className='text-muted mt-5'>
        Ei tallennettuja suosikkeja. Tallenna ilmoituksia napauttamalla
        sydänkuvaketta ilmoitussivulla.
      </p>
      <Button className='mt-5' variant='danger'>
        Tee uusi haku
      </Button>
    </div>
  );
}

export const getServerSideProps = withSession(({ req }) => {
  const { user } = req.session;

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
});
