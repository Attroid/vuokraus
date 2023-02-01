import knex from 'database/knex';
import t from 'localization/i18n';

const TradeType = {
  /**
   * Find all trade types
   * @returns {Array<Object>} trade types
   */
  findAll: async function () {
    const tradeTypes = await knex('tradeType').select('*');
    return this.localizeMany(tradeTypes);
  },

  /**
   * Localize trade type
   * @param {Object} tradeType
   * @returns {Object} localized trade type
   */
  localize: function (tradeType) {
    return { ...tradeType, label: t(`tradeType.${tradeType.label}`) };
  },

  /**
   * Localize trade types
   * @param {Array<Object>} tradeTypes
   * @returns {Array<Object>} localized trade types
   */
  localizeMany: function (tradeTypes) {
    return tradeTypes.map(this.localize);
  },
};

export default TradeType;
