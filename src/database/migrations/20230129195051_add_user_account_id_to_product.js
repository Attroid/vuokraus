const tableName = 'product';
const columnName = 'userAccountId';

exports.up = async (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table
      .integer(columnName)
      .references('id')
      .inTable('userAccount')
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn(columnName);
  });
};
