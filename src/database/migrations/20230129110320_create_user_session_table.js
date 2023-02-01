const tableName = 'userSession';

exports.up = async (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('userAgent').notNullable();
    table.string('uuid').notNullable();
    table.integer('userAccountId').references('id').inTable('userAccount');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
