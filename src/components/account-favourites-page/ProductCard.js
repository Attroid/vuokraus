import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product, onDelete }) {
  return (
    <Card className='pt-3'>
      <Link
        href={`/products/${product.id}`}
        className='d-flex justify-content-center'
      >
        <Image
          as={Image}
          width={160}
          height={120}
          style={{ width: 'auto' }}
          alt={product.description}
          src={'https://loremflickr.com/160/120/' + product.imageUrl}
        />
      </Link>
      <Card.Body className='d-flex flex-column align-items-center'>
        <Card.Title>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </Card.Title>
        <Card.Text>{product.price} €</Card.Text>
        <Button variant='danger' onClick={onDelete}>
          Poista
        </Button>
      </Card.Body>
    </Card>
  );
}
