import Category from './models/Category';
import Province from './models/Province';
import TradeType from './models/TradeType';
import Product from './models/Product';
import Auth from './Auth';
import Condition from './models/Condition';
import DeliveryType from './models/DeliveryType';

const Marketplace = {
  /**
   * Find all values that can be used to filter products
   * @returns {{
   *    categories:    Array<Object>,
   *    provinces:     Array<Object>,
   *    tradeTypes:    Array<Object>,
   *    conditions:    Array<Object>,
   *    deliveryTypes: Array<Object>
   * }}
   */
  getProductFilters: async function () {
    const [categories, provinces, tradeTypes, conditions, deliveryTypes] =
      await Promise.all([
        Category.findAll(),
        Province.findAll(),
        TradeType.findAll(),
        Condition.findAll(),
        DeliveryType.findAll(),
      ]);

    return {
      categories,
      provinces,
      tradeTypes,
      conditions,
      deliveryTypes,
    };
  },

  /**
   * Find product by id
   * @param {number} productId
   * @param {number} userAccountId if provided, isFavorite is assigned to product
   * @returns {Object} product
   *
   * @throws {ProductNotFoundError}
   */
  findProductById: function (productId, userAccountId) {
    return Product.findById(productId, userAccountId);
  },

  /**
   * Find paginated products
   * @param {number} pageNumber
   * @param {number} pageSize
   * @param {string} searchTerm
   * @param {Array<number>} provinceIds
   * @param {Array<number>} categoryIds
   * @param {Array<number>} tradeTypeIds
   * @returns {{
   *    products: Array<Object>,
   *    productCount: number,
   *    pageCount: number
   * }} paginated products, filtered products count and page amount
   */
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

  /**
   * Mark product as favorite/unfavorite for user account
   * @param {number} userAccountId
   * @param {number} productId
   * @returns {boolean} is product now marked as favorite
   *
   * @throws {ProductNotFoundError}
   */
  toggleProductFavorite: async function (authToken, userAgent, productId) {
    const userAccount = await Auth.validateSession(authToken, userAgent);
    return Product.toggleFavorite(userAccount.id, productId);
  },

  /**
   * Find all products that user has marked as favorite
   * @param {number} userAccountId
   * @returns {Array<Object>} products
   */
  findUserAccountFavoriteProducts: async function (userAccountId) {
    return Product.findUserAccountFavorites(userAccountId);
  },

  /**
   * Find all products that user has added
   * @param {number} userAccountId
   * @returns {Array<Object>} products
   */
  findUserAccountOwnProducts: async function (userAccountId) {
    return Product.findUserAccountOwnProducts(userAccountId);
  },

  /**
   * Delete product
   * @param {number} userAccountId
   * @returns {Array<Object>} products
   */
  deleteProduct: async function (authToken, userAgent, productId) {
    const userAccount = await Auth.validateSession(authToken, userAgent);
    return Product.delete(userAccount?.id, productId);
  },

  /**
   * Create product
   * @param {Object} user
   * @param {Object} product
   * @returns {Object} created product
   */
  createProduct: async function (user, product) {
    return Product.create(user, product);
  },
};

export default Marketplace;
