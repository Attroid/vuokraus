import knex from 'database/knex';
import t from 'localization/i18n';

const Category = {
  /**
   * Find all categories
   * @returns {Array<Object>} categories
   */
  findAll: async function () {
    const categories = await knex('category').select('*');
    return this.localizeMany(categories);
  },

  /**
   * Localize category
   * @param {Object} category
   * @returns {Object} localized category
   */
  localize: function (category) {
    return { ...category, label: t(`category.${category.label}`) };
  },

  /**
   * Localize categories
   * @param {Array<Object>} categories
   * @returns {Array<Object>} localized categories
   */
  localizeMany: function (categories) {
    return categories.map(this.localize);
  },
};

export default Category;
