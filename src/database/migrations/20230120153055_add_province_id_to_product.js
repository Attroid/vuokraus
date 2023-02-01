const tableName = 'product';
const columnName = 'provinceId';

exports.up = async (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table
      .integer(columnName)
      .references('id')
      .inTable('province')
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn(columnName);
  });
};
