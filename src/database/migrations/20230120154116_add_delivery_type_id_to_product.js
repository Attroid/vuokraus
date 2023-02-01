const tableName = 'product';
const columnName = 'deliveryTypeId';

exports.up = async (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table
      .integer(columnName)
      .references('id')
      .inTable('deliveryType')
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn(columnName);
  });
};
