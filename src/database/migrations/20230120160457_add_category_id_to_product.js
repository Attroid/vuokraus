const tableName = 'product';
const columnName = 'categoryId';

exports.up = async (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table
      .integer(columnName)
      .references('id')
      .inTable('category')
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn(columnName);
  });
};
