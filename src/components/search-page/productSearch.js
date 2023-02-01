import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { removeEmpty } from 'utils/helpers';

function ProductSearch({ provinces, tradeTypes, categories }) {
  const router = useRouter();
  const [province, setProvince] = useState(router.query.p || '');
  const [category, setCategory] = useState(router.query.c || '');
  const [query, setQuery] = useState(router.query.q || '');
  const [selectedTradeTypes, setSelectedTradeTypes] = useState(
    router.query.t?.split('|').map(Number) || []
  );

  const handleSearch = (ev) => {
    ev.preventDefault();

    router.push({
      pathname: '/search',
      query: removeEmpty({
        p: province,
        c: category,
        q: query,
        t: selectedTradeTypes.join('|'),
      }),
    });
  };

  const handleTradeTypeChange = (ev) => {
    const tradeTypeSet = new Set(selectedTradeTypes);
    const checked = ev.target.checked;
    const value = Number(ev.target.value);

    if (checked) {
      tradeTypeSet.add(value);
    } else {
      tradeTypeSet.delete(value);
    }

    setSelectedTradeTypes([...tradeTypeSet]);
  };

  return (
    <Form
      className='mt-5 border bg-light p-3'
      style={{ fontSize: 12 }}
      onSubmit={handleSearch}
    >
      <Row className='gx-1'>
        <Col sm={4}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Hakusana'
              value={query}
              onChange={({ target }) => setQuery(target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Select
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          >
            <option value=''>Kaikki osastot</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col sm={2}>
          <Form.Select
            value={province}
            onChange={({ target }) => setProvince(target.value)}
          >
            <option value=''>Koko Suomi</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className='gx-4'>
        {tradeTypes.map((tradeType) => (
          <Col sm='auto' key={tradeType.id}>
            <Form.Check
              id={`tradeType-${tradeType.id}`}
              type='checkbox'
              value={tradeType.id}
              label={tradeType.label}
              checked={selectedTradeTypes.includes(tradeType.id)}
              onChange={handleTradeTypeChange}
            />
          </Col>
        ))}
        <Col className='d-flex justify-content-end'>
          <Button
            variant='danger'
            className='justify-content-end'
            type='submit'
          >
            Hae
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

ProductSearch.defaultProps = {
  provinces: [],
  tradeTypes: [],
  categories: [],
};

export default ProductSearch;
