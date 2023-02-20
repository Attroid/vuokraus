import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function ProductForm({
  initialData,
  categories,
  provinces,
  tradeTypes,
  conditions,
  deliveryTypes,
  onSubmit,
}) {
  const [category, setCategory] = useState('');
  const [province, setProvince] = useState('');
  const [tradeType, setTradeType] = useState('');
  const [condition, setCondition] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handlePriceChange = (event) => {
    if (/^\d*$/.test(event.target.value)) {
      setPrice(event.target.value);
    }
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (!(event.target.files && file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      setImage({
        src: e.target.result,
        file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit({
      tradeType: tradeTypes.find((t) => t.id === tradeType),
      province: provinces.find((p) => p.id === province),
      category: categories.find((c) => c.id === category),
      condition: conditions.find((c) => c.id === condition),
      deliveryType: deliveryTypes.find((d) => d.id === deliveryType),
      image,
      name,
      description,
      price,
    });
  };

  useEffect(() => {
    setCategory(initialData?.category.id || '');
    setProvince(initialData?.province.id || '');
    setTradeType(initialData?.tradeType.id || '');
    setCondition(initialData?.condition.id || '');
    setDeliveryType(initialData?.deliveryType.id || '');
    setImage(initialData?.image || null);
    setName(initialData?.name || '');
    setDescription(initialData?.description || '');
    setPrice(initialData?.price || '');
  }, []);

  return (
    <Form className='mt-3' onSubmit={handleSubmit}>
      <ul>
        <li>Lisää ilmoitus ilmaiseksi, helposti ja nopeasti</li>
        <li>Muille käyttäjille näkyy tiedoistasi ainoastaan nimesi</li>
      </ul>
      <div className='border bg-light p-3'>
        <h2>Ilmoituksen tyyppi</h2>

        <Form.Group className='ps-4'>
          <Form.Label className='required me-4'>Osasto</Form.Label>
          <Form.Select
            value={category}
            onChange={({ target }) => setCategory(Number(target.value))}
            style={{ maxWidth: 200 }}
            required
          >
            <option value=''>-- Valitse osasto --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='mt-4 ps-4' controlId='province'>
          <Form.Label className='required me-4'>Maakunta</Form.Label>
          <Form.Select
            value={province}
            onChange={({ target }) => setProvince(Number(target.value))}
            style={{ maxWidth: 200 }}
            required
          >
            <option value=''>-- Valitse maakunta --</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Row className='gx-4 mt-4 ps-4'>
          <Form.Label className='required me-4'>Ilmoitustyyppi</Form.Label>
          {tradeTypes.map(({ id, label }) => (
            <Col sm='auto' key={id}>
              <Form.Check
                id={`tradeType-${id}`}
                type='radio'
                name='tradeType'
                value={id}
                label={label}
                checked={tradeType === id}
                onChange={({ target }) => setTradeType(Number(target.value))}
                required
              />
            </Col>
          ))}
        </Row>
        <Row className='gx-4 mt-4 ps-4'>
          <Form.Label className='required me-4'>Kunto</Form.Label>
          {conditions.map(({ id, label }) => (
            <Col sm='auto' key={id}>
              <Form.Check
                id={`condition-${id}`}
                type='radio'
                name='condition'
                value={id}
                label={label}
                checked={condition === id}
                onChange={({ target }) => setCondition(Number(target.value))}
                required
              />
            </Col>
          ))}
        </Row>
        <Row className='gx-4 mt-4 ps-4'>
          <Form.Label className='required me-4'>Toimitustapa</Form.Label>
          {deliveryTypes.map(({ id, label }) => (
            <Col sm='auto' key={id}>
              <Form.Check
                id={`deliveryType-${id}`}
                type='radio'
                name='deliveryType'
                value={id}
                label={label}
                checked={deliveryType === id}
                onChange={({ target }) => setDeliveryType(Number(target.value))}
                required
              />
            </Col>
          ))}
        </Row>
      </div>
      <div className='border p-3 bg-light mt-2'>
        <h2>Ilmoituksen tiedot</h2>

        <Form.Group className='ps-4'>
          <Form.Label className='me-4 required'>Kuva</Form.Label>
          <div
            className='custom-file-button input-group'
            style={{ maxWidth: 400 }}
          >
            <label className='input-group-text' htmlFor='inputGroupFile'>
              Lisää kuva
            </label>
            <input
              type='file'
              accept='image/png, image/gif, image/jpeg'
              className='form-control'
              id='inputGroupFile'
              onChange={onImageChange}
              required
            />
          </div>

          {image && (
            <>
              <img
                className='my-2 border'
                src={image.src}
                alt='image preview'
                style={{ maxWidth: 200, maxHeight: 200 }}
              />
              <div>
                <small>Kuva muokataan 4:3 resoluutioon tallennettaessa.</small>
              </div>
            </>
          )}
        </Form.Group>
        <Form.Group className='mt-4 ps-4' controlId='province'>
          <Form.Label className='required me-4'>Otsikko</Form.Label>
          <Form.Control
            type='text'
            style={{ maxWidth: 400 }}
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
            minLength={4}
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mt-4 ps-4' controlId='province'>
          <Form.Label className='required me-4'>Ilmoitusteksti</Form.Label>
          <Form.Control
            as='textarea'
            rows={4}
            style={{ maxWidth: 400 }}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
            minLength={4}
            maxLength={1000}
          />
        </Form.Group>

        <Form.Group className='mt-4 ps-4' controlId='province'>
          <Form.Label className='me-4'>Hinta €</Form.Label>
          <Form.Control
            type='text'
            style={{ maxWidth: 200 }}
            value={price}
            onChange={handlePriceChange}
            maxLength={10}
          />
        </Form.Group>
      </div>
      <div className='mt-2 border bg-light p-3'>
        <h2>Yhteydenotot</h2>

        <p className='ms-4'>
          Ilmoitukseesi liittyvät yhteydenotot tulevat suoraan
          Vuokraus.fi-viesteinä.
        </p>
        <p className='ms-4'>
          Suojataksemme käyttäjien yksityisyyttä, emme näytä ilmoituksissa muuta
          kuin käyttäjän nimen.
        </p>
      </div>
      <div className='d-flex justify-content-between mt-2'>
        <Button variant='secondary' as={Link} href='/search'>
          Keskeytä
        </Button>
        <Button variant='danger' type='submit'>
          Jatka 2-vaiheeseen
        </Button>
      </div>
    </Form>
  );
}
