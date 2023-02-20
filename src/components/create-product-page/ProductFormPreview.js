import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function ProductFormPreview({ data, onCancel, onConfirm }) {
  const {
    category,
    description,
    name,
    image,
    province,
    tradeType,
    price,
    condition,
    deliveryType,
  } = data;

  return (
    <div className='mt-3'>
      <ul>
        <li>Tarkista, että tiedot pitävät paikkaansa</li>
        <li>
          Lopussa paina "Julkaise" tai mikäli tahdot muuttaa tietoja, "Muuta
          ilmoitusta"
        </li>
      </ul>
      <div className='border bg-light p-3'>
        <h2>Ilmoituksen tyyppi</h2>

        <Row>
          <Col className='text-end' sm={3}>
            Osasto:
          </Col>
          <Col sm={9}>{category.label}</Col>
        </Row>
        <Row className='mt-2'>
          <Col className='text-end' sm={3}>
            Maakunta:
          </Col>
          <Col sm={9}>{province.name}</Col>
        </Row>
        <Row className='mt-2'>
          <Col className='text-end' sm={3}>
            Ilmoitustyyppi:
          </Col>
          <Col sm={9}>{tradeType.label}</Col>
        </Row>
        <Row className='mt-2'>
          <Col className='text-end' sm={3}>
            Kunto:
          </Col>
          <Col sm={9}>{condition.label}</Col>
        </Row>
        <Row className='mt-2'>
          <Col className='text-end' sm={3}>
            Toimitustapa:
          </Col>
          <Col sm={9}>{deliveryType.label}</Col>
        </Row>
      </div>
      <div className='border bg-light p-3 mt-2'>
        <h2>Ilmoituksen tiedot</h2>

        <Row>
          <Col className='text-end' sm={3}>
            Nimi
          </Col>
          <Col sm={9} className='product-name'>
            {name}
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col className='text-end' sm={3}>
            Kuvaus
          </Col>
          <Col sm={9} className='product-description'>
            {description}
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col className='text-end' sm={3}>
            Kuva:
          </Col>
          <Col sm={9}>
            {!image && 'Ei kuvaa'}
            {image && (
              <>
                <img
                  className='my-2 border'
                  src={image.src}
                  alt='image preview'
                  style={{ maxWidth: 200, maxHeight: 200 }}
                />
                <div>
                  <small>
                    Kuva muokataan 4:3 resoluutioon tallennettaessa.
                  </small>
                </div>
              </>
            )}
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col className='text-end' sm={3}>
            Hinta:
          </Col>
          <Col sm={9}>{price ? `${price} €` : '-'}</Col>
        </Row>
      </div>
      <div className='d-flex justify-content-between mt-2'>
        <Button variant='secondary' onClick={onCancel}>
          Muuta ilmoitusta
        </Button>
        <Button variant='danger' onClick={onConfirm}>
          Julkaise
        </Button>
      </div>
    </div>
  );
}
