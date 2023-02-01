import ListGroup from 'react-bootstrap/ListGroup';
import ProductListItem from './productListItem';

function ProductList({ products }) {
  return (
    <ListGroup variant='flush' className='mt-5'>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ListGroup>
  );
}

export default ProductList;
