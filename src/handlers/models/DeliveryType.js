import knex from 'database/knex';
import t from 'localization/i18n';

const DeliveryType = {
  /**
   * Find all delivery types
   * @returns {Array<Object>} delivery types
   */
  findAll: async function () {
    const deliveryTypes = await knex('deliveryType').select('*');
    return this.localizeMany(deliveryTypes);
  },

  /**
   * Localize delivery type
   * @param {Object} delivery type
   * @returns {Object} localized delivery type
   */
  localize: function (deliveryType) {
    return { ...deliveryType, label: t(`deliveryType.${deliveryType.label}`) };
  },

  /**
   * Localize delivery types
   * @param {Array<Object>} deliveryTypes
   * @returns {Array<Object>} localized delivery types
   */
  localizeMany: function (deliveryTypes) {
    return deliveryTypes.map(this.localize);
  },
};

export default DeliveryType;
