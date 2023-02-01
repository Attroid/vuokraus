import AccountTabs from 'components/commons/accountTabs';
import Button from 'react-bootstrap/Button';
import withSession from 'utils/sessionHook';

export default function Account() {
  return (
    <div className='mt-4'>
      <AccountTabs />

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
