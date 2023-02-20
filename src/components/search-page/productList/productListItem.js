import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Link from 'next/link';
import Image from 'next/image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatIsoDateString } from 'utils/helpers';

function ProductListItem({ product }) {
  return (
    <ListGroupItem
      as={Link}
      href={`/products/${product.id}`}
      action
      key={product.id}
      className='py-3'
    >
      <Row>
        <Col sm='auto'>
          <Image
            key={product.id}
            src={product.thumbUrl}
            width={180}
            height={180}
            alt={product.name}
          />
        </Col>
        <Col>
          <div className='fs-5 product-name'>{product.name}</div>
          <div className='py-3'>
            <p className='fs-4'>{product.price || '-'} €</p>
          </div>
        </Col>
        <Col sm='auto'>
          <div>{formatIsoDateString(product.createdAt)}</div>
          <div>{product.province.name}</div>
          <div>{product.tradeType.label}</div>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default ProductListItem;
