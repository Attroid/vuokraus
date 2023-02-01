import Link from 'next/link';
import Image from 'next/image';
import { Row, Col, Breadcrumb, Button } from 'react-bootstrap';
import withSession from 'utils/sessionHook';
import Marketplace from 'handlers/Marketplace';
import axios from 'axios';
import HeartButton from 'components/product-page/HeartButton';
import { useRouter } from 'next/router';

const parseDate = (IsoDateString) => {
  const [date, time] = IsoDateString.split('T');

  const parsedDate = date.split('-').reverse().map(Number).join('.');
  const parsedTime = time.split(':').slice(0, 2).map(Number).join(':');

  return `${parsedDate} ${parsedTime}`;
};

export default function Product({ product, user }) {
  const router = useRouter();

  const handleFavoriteToggle = async () => {
    try {
      await axios.post(`/api/products/${product.id}/favorite`);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mt-5'>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} href='/search'>
            Haku
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            href={`/search?p=${product.province.id}`}
          >
            {product.province.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            href={`/search?c=${product.category.id}`}
          >
            {product.category.label}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        {user && (
          <HeartButton
            active={product.isFavorite}
            onClick={handleFavoriteToggle}
          />
        )}
      </div>

      <br />
      <Image
        width={640}
        height={480}
        className='w-100'
        style={{ height: 'auto' }}
        src={'https://loremflickr.com/640/480/' + product.imageUrl}
        alt={product.name}
      />
      <Row className='mt-3 mb-2'>
        <Col>
          <h1 className='fs-4 fw-bold'>{product.name}</h1>
        </Col>
        <Col sm='auto'>
          <div className='fs-4 fw-bold'>{product.price} €</div>
        </Col>
      </Row>
      <Row>
        <Col sm='6' className='py-1'>
          Ilmoitustyyppi:{' '}
          <span className='fw-bold'>{product.tradeType.label}</span>
        </Col>
        <Col sm='6' className='py-1'>
          Ilmoitus jätetty:{' '}
          <span className='fw-bold'>{parseDate(product.createdAt)}</span>
        </Col>
        <Col sm='6' className='py-1'>
          Kunto: <span className='fw-bold'>{product.condition.label}</span>
        </Col>
        <Col sm='6' className='py-1'>
          Toimitustapa:{' '}
          <span className='fw-bold'>{product.deliveryType.label}</span>
        </Col>
      </Row>
      <h2 className='fs-5 mt-5 fw-bold'>Lisätiedot</h2>
      <hr className='mt-0 mb-3' />
      <div className='ps-4 w-75'>
        <p>{product.description}</p>
        <p>Ota yhteyttä ilmoittajaan {product.userAccount.username}</p>
        <Button variant='danger'>Soita</Button>
        <Button className='ms-1' variant='danger'>
          Viesti
        </Button>
      </div>
    </>
  );
}

export const getServerSideProps = withSession(async ({ req, res, query }) => {
  const { user } = req.session;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const product = await Marketplace.findProductById(query.id, user?.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), user },
  };
});
