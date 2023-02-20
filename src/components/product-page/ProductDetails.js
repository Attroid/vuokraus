import { Row, Col, Button } from 'react-bootstrap';
import { formatIsoDateString } from 'utils/helpers';

export default function ProductDetails({ product }) {
  return (
    <div>
      <Row className='mt-3 mb-2'>
        <Col>
          <h1 className='fs-4 fw-bold product-name'>{product.name}</h1>
        </Col>
        <Col sm='auto'>
          <div className='fs-4 fw-bold'>{product.price || '-'} €</div>
        </Col>
      </Row>
      <Row>
        <Col sm='6' className='py-1'>
          Ilmoitustyyppi:{' '}
          <span className='fw-bold'>{product.tradeType.label}</span>
        </Col>
        <Col sm='6' className='py-1'>
          Ilmoitus jätetty:{' '}
          <span className='fw-bold'>
            {formatIsoDateString(product.createdAt)}
          </span>
        </Col>
        <Col sm='6' className='py-1'>
          Kunto: <span className='fw-bold'>{product.condition.label}</span>
        </Col>
        <Col sm='6' className='py-1'>
          Toimitustapa:{' '}
          <span className='fw-bold'>{product.deliveryType.label}</span>
        </Col>
      </Row>
      <h2 className='fs-5 mt-5 fw-bold text-wrap'>Lisätiedot</h2>
      <hr className='mt-0 mb-3' />
      <div className='ps-4 w-75'>
        <p className='text-break product-description'>{product.description}</p>
        <p>Ota yhteyttä ilmoittajaan {product.userAccount.username}</p>
        <Button variant='danger' disabled>
          Soita
        </Button>
        <Button className='ms-1' variant='danger' disabled>
          Viesti
        </Button>
      </div>
    </div>
  );
}
