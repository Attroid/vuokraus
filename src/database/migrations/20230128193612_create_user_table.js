const { onUpdateTrigger } = require('../../../knexfile');
const tableName = 'user_account';

exports.up = async (knex) => {
  return knex.transaction((trx) => {
    return trx.schema
      .createTable(tableName, (table) => {
        table.increments();
        table.string('username');
        table.string('passwordHash');
        table.timestamps(true, true);
      })
      .raw(onUpdateTrigger(tableName));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
