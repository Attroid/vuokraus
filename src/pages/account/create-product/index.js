import withSession from 'utils/sessionHook';
import Marketplace from 'handlers/Marketplace';
import ProductForm from 'components/create-product-page/ProductForm';
import ProductFormPreview from 'components/create-product-page/ProductFormPreview';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Link from 'next/link';

export default function CreateProduct({
  categories,
  provinces,
  tradeTypes,
  conditions,
  deliveryTypes,
}) {
  const [phaseNo, setPhaseNo] = useState(1);
  const [data, setData] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image.file);
    formData.append('categoryId', data.category.id);
    formData.append('provinceId', data.province.id);
    formData.append('tradeTypeId', data.tradeType.id);
    formData.append('conditionId', data.condition.id);
    formData.append('deliveryTypeId', data.deliveryType.id);
    formData.append('price', data.price);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    await axios.post('/api/products', formData, headers);

    setPhaseNo(3);
  };

  return (
    <>
      <h1 className='mt-5'>Jätä ilmoitus</h1>
      <div>
        <Row className='border'>
          <Col
            className={`text-center position-relative p-2 arrow-right ${
              phaseNo === 1 ? 'bg-info' : 'bg-light'
            }`}
          >
            1. Ilmoituksen tiedot
          </Col>
          <Col
            className={`text-center position-relative p-2 arrow-right ${
              phaseNo === 2 ? 'bg-info' : 'bg-light'
            }`}
          >
            2. Tietojen tarkistus
          </Col>
          <Col
            className={`text-center p-2 ${
              phaseNo === 3 ? 'bg-info' : 'bg-light'
            }`}
          >
            3. Julkaise
          </Col>
        </Row>
      </div>
      {phaseNo === 1 && (
        <ProductForm
          categories={categories}
          provinces={provinces}
          tradeTypes={tradeTypes}
          conditions={conditions}
          deliveryTypes={deliveryTypes}
          onSubmit={(data) => {
            setData(data);
            setPhaseNo(2);
          }}
          initialData={data}
        />
      )}

      {phaseNo === 2 && (
        <ProductFormPreview
          data={data}
          onCancel={() => setPhaseNo(1)}
          onConfirm={upload}
        />
      )}

      {phaseNo === 3 && (
        <div className='mt-3'>
          <ul>
            <li>
              Ilmoituksesi on nyt julkaistu ja löydät sen "Omat ilmoitukset"
              -osiosta.
            </li>
            <li>Moderaattori poistaa kaikki epäasialliset ilmoitukset</li>
          </ul>
          <Button as={Link} href='/account' variant='danger'>
            Omat ilmoitukset
          </Button>
          <Button as={Link} href='/search' variant='danger ms-4'>
            Kaikki ilmoitukset
          </Button>
        </div>
      )}
    </>
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

  const { categories, provinces, tradeTypes, conditions, deliveryTypes } =
    await Marketplace.getProductFilters();

  return {
    props: {
      user,
      categories,
      provinces,
      tradeTypes,
      conditions,
      deliveryTypes,
    },
  };
});
