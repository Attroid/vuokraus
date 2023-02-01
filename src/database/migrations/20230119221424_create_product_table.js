const { onUpdateTrigger } = require('../../../knexfile');
const tableName = 'product';

exports.up = async (knex) => {
  return knex.transaction((trx) => {
    return trx.schema
      .createTable(tableName, (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('description', 1000).notNullable();
        table.integer('price').unsigned().notNullable();
        table.string('imageUrl', 1000);
        table.timestamps(true, true);
      })
      .raw(onUpdateTrigger(tableName));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
