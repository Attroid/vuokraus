import knex from 'database/knex';
import t from 'localization/i18n';

const Condition = {
  /**
   * Find all conditions
   * @returns {Array<Object>} conditions
   */
  findAll: async function () {
    const conditions = await knex('condition').select('*');
    return this.localizeMany(conditions);
  },

  /**
   * Localize condition
   * @param {Object} condition
   * @returns {Object} localized condition
   */
  localize: function (condition) {
    return { ...condition, label: t(`condition.${condition.label}`) };
  },

  /**
   * Localize conditions
   * @param {Array<Object>} conditions
   * @returns {Array<Object>} localized conditions
   */
  localizeMany: function (conditions) {
    return conditions.map(this.localize);
  },
};

export default Condition;
