import Link from 'next/link';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function ProductBreadcrump({ product }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} href='/search'>
        Haku
      </Breadcrumb.Item>
      <Breadcrumb.Item linkAs={Link} href={`/search?p=${product.province.id}`}>
        {product.province.name}
      </Breadcrumb.Item>
      <Breadcrumb.Item linkAs={Link} href={`/search?c=${product.category.id}`}>
        {product.category.label}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
