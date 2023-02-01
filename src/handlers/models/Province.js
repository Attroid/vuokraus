import knex from 'database/knex';

const Province = {
  /**
   * Find all provinces
   * @returns {Array<Object>} provinces
   */
  findAll: async function () {
    return await knex('province').select('*');
  },
};

export default Province;
