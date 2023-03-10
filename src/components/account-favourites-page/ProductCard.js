import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <Card className='pt-1'>
      <Link
        href={`/products/${product.id}`}
        className='d-flex justify-content-center'
      >
        <Image
          as={Image}
          width={180}
          height={180}
          alt={product.description}
          src={product.thumbUrl}
        />
      </Link>
      <Card.Body className='d-flex flex-column align-items-center'>
        <Card.Title className='product-name'>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </Card.Title>
        <Card.Text>{product.price || '-'} €</Card.Text>
        <Row className='w-100 justify-content-md-center'>
          {onEdit && (
            <Col sm={6} className='px-1'>
              <Button
                className='border py-1 px-2 w-100 d-flex align-items-center justify-content-center'
                variant='light'
                disabled
              >
                <small>Muokkaa</small>
              </Button>
            </Col>
          )}
          {onDelete && (
            <Col sm={6} className='px-1'>
              <Button
                className='w-100 py-1 px-2 d-flex align-items-center justify-content-center'
                variant='danger'
                onClick={onDelete}
              >
                <small>Poista</small>
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
