import knex from 'database/knex';
import t from 'localization/i18n';
import { ProductNotFoundError } from 'utils/customErrors';
import { cloneDeep, isEmpty } from 'utils/helpers';
import { Knex } from 'knex';

const Product = {
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
  findPaginatedProducts: async function (
    pageNumber = 0,
    pageSize = 50,
    searchTerm = '',
    provinceIds = [],
    categoryIds = [],
    tradeTypeIds = []
  ) {
    let productQuery = this.getProductJoinQuery();

    if (searchTerm) {
      productQuery = productQuery.whereRaw(
        'LOWER(product.name) LIKE ?',
        `%${searchTerm.toLowerCase()}%`
      );
    }

    if (isEmpty(provinceIds) === false) {
      productQuery = productQuery.whereIn('product.provinceId', provinceIds);
    }

    if (isEmpty(categoryIds) === false) {
      productQuery = productQuery.whereIn('product.categoryId', categoryIds);
    }

    if (isEmpty(tradeTypeIds) === false) {
      productQuery = productQuery.whereIn('product.tradeTypeId', tradeTypeIds);
    }

    const products = await this.selectProducts(productQuery.clone())
      .limit(pageSize)
      .offset(pageSize * pageNumber)
      .orderBy('product.id', 'ASC');

    const [{ count }] = await productQuery.count('product.id');

    return {
      products: this.localizeMany(products),
      productCount: Number(count),
      pageCount: Math.ceil(Number(count) / pageSize),
    };
  },

  /**
   * Find product by id
   * @param {number} productId
   * @returns {Object} product
   *
   * @throws {ProductNotFoundError}
   */
  findById: async function (productId) {
    const product = await this.selectProducts(this.getProductJoinQuery())
      .where('product.id', productId)
      .first();

    if (!product) {
      throw new ProductNotFoundError();
    }

    return this.localize(product);
  },

  /**
   * Get basic product join query
   * @returns {Knex.QueryBuilder}
   */
  getProductJoinQuery: function () {
    return knex('product')
      .leftJoin('condition', 'condition.id', 'product.conditionId')
      .leftJoin('tradeType', 'tradeType.id', 'product.tradeTypeId')
      .leftJoin('province', 'province.id', 'product.provinceId')
      .leftJoin('deliveryType', 'deliveryType.id', 'product.deliveryTypeId')
      .leftJoin('category', 'category.id', 'product.categoryId')
      .leftJoin('userAccount', 'userAccount.id', 'product.userAccountId');
  },

  /**
   * Append product selects to query
   * @param {Knex.QueryBuilder} query
   * @returns {Knex.QueryBuilder}
   */
  selectProducts: function (query) {
    return query.select([
      'product.id',
      'product.name',
      'product.description',
      'product.price',
      'product.imageUrl',
      'product.createdAt',
      'product.updatedAt',
      knex.raw(
        "json_build_object('id', condition.id, 'label', condition.label) as condition"
      ),
      knex.raw(
        "json_build_object('id', trade_type.id, 'label', trade_type.label) as trade_type"
      ),
      knex.raw(
        "json_build_object('id', province.id, 'name', province.name) as province"
      ),
      knex.raw(
        "json_build_object('id', delivery_type.id, 'label', delivery_type.label) as delivery_type"
      ),
      knex.raw(
        "json_build_object('id', category.id, 'label', category.label) as category"
      ),
      knex.raw(
        "json_build_object('id', user_account.id, 'label', user_account.username) as user_account"
      ),
    ]);
  },

  /**
   * Localize product
   * @param {Object} product
   * @returns {Object} localized product
   */
  localize: function (product) {
    const clone = cloneDeep(product);

    clone.condition.label = t(`condition.${clone.condition.label}`);
    clone.tradeType.label = t(`tradeType.${clone.tradeType.label}`);
    clone.deliveryType.label = t(`deliveryType.${clone.deliveryType.label}`);
    clone.category.label = t(`category.${clone.category.label}`);

    return clone;
  },

  /**
   * Localize products
   * @param {Array<Object>} products
   * @returns {Array<Object>} localized products
   */
  localizeMany: function (products) {
    return products.map(this.localize);
  },
};

export default Product;
