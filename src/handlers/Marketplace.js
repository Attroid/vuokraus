import Category from './models/Category';
import Province from './models/Province';
import TradeType from './models/TradeType';
import Product from './models/Product';
import Auth from './Auth';

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

  findProductById: function (productId, userAccountId) {
    return Product.findById(productId, userAccountId);
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

  toggleProductFavorite: async function (authToken, userAgent, productId) {
    const userAccount = await Auth.validateSession(authToken, userAgent);
    return Product.toggleFavorite(userAccount.id, productId);
  },

  findUserAccountFavoriteProducts: async function (userAccountId) {
    return Product.findUserAccountFavorites(userAccountId);
  },
};

export default Marketplace;
