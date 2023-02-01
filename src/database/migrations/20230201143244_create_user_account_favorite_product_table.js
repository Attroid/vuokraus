const tableName = 'userAccountFavoriteProduct';

exports.up = async (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .integer('userAccountId')
      .references('id')
      .inTable('userAccount')
      .notNullable();
    table
      .integer('productId')
      .references('id')
      .inTable('product')
      .notNullable();
    table.unique(['userAccountId', 'productId']);
    table.index('userAccountId');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
