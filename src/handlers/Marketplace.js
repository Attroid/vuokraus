import Category from './models/Category';
import Province from './models/Province';
import TradeType from './models/TradeType';
import Product from './models/Product';

const Marketplace = {
  getProductFilters: async function () {
    const [categories, provinces, tradeTypes] = await Promise.all([
      Category.findAll(),
      Province.findAll(),
      TradeType.findAll(),
    ]);

    return {
      categories,
      provinces,
      tradeTypes,
    };
  },

  findProductById: function (productId) {
    return Product.findById(productId);
  },

  findPaginatedProducts: function (
    pageNumber,
    pageSize,
    searchTerm,
    provinceIds,
    categoryIds,
    tradeTypeIds
  ) {
    return Product.findPaginatedProducts(
      pageNumber,
      pageSize,
      searchTerm,
      provinceIds,
      categoryIds,
      tradeTypeIds
    );
  },
};

export default Marketplace;
