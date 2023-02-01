const tableName = 'product';
const columnName = 'tradeTypeId';

exports.up = async (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table
      .integer(columnName)
      .references('id')
      .inTable('tradeType')
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn(columnName);
  });
};
