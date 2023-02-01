import { useRouter } from 'next/router';
import ProductSearch from 'components/search-page/productSearch';
import ProductsNotFound from 'components/search-page/productsNotFound';
import ProductList from 'components/search-page/productList';
import ProductPagination from 'components/search-page/productPagination';
import { cloneDeep } from 'utils/helpers';
import withSession from 'utils/sessionHook';
import Marketplace from 'handlers/Marketplace';

export default function Search({
  products,
  pageCount,
  provinces,
  tradeTypes,
  categories,
}) {
  const router = useRouter();
  const pageNo = Number(router.query.pageNo) || 0;

  return (
    <>
      <ProductSearch
        provinces={provinces}
        tradeTypes={tradeTypes}
        categories={categories}
      />
      <ProductsNotFound show={products.length === 0} />
      <ProductList products={products} />
      <ProductPagination count={pageCount} page={pageNo} />
    </>
  );
}

export const getServerSideProps = withSession(async ({ req, query }) => {
  const { user } = req.session;
  const pageNo = Number(query.pageNo);

  const { products, pageCount } = await Marketplace.findPaginatedProducts(
    pageNo || 0,
    50,
    query.q,
    query.p ? [Number(query.p)] : null,
    query.c ? [Number(query.c)] : null,
    query.t ? query.t.split('|').map(Number) : null
  );

  const { categories, provinces, tradeTypes } =
    await Marketplace.getProductFilters();

  return {
    props: {
      products: cloneDeep(products),
      pageCount,
      provinces,
      tradeTypes,
      categories,
      user,
    },
  };
});
