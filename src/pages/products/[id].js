import Image from 'next/image';
import withSession from 'utils/sessionHook';
import Marketplace from 'handlers/Marketplace';
import axios from 'axios';
import HeartButton from 'components/product-page/HeartButton';
import { useRouter } from 'next/router';
import ProductBreadcrump from 'components/product-page/ProductBreadcrump';
import ProductDetails from 'components/product-page/ProductDetails';

export default function Product({ product, user }) {
  const router = useRouter();

  const handleFavoriteToggle = async () => {
    try {
      await axios.post(`/api/products/${product.id}/favorite`);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mt-5'>
        <ProductBreadcrump product={product} />
        {user && (
          <HeartButton
            active={product.isFavorite}
            onClick={handleFavoriteToggle}
          />
        )}
      </div>
      <Image
        width={640}
        height={480}
        className='w-100'
        style={{ height: 'auto' }}
        src={product.imageUrl}
        alt={product.name}
      />
      <ProductDetails product={product} />
    </>
  );
}

export const getServerSideProps = withSession(async ({ req, query }) => {
  const { user } = req.session;

  const product = await Marketplace.findProductById(query.id, user?.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), user },
  };
});
