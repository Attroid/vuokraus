const tableName = 'province';

exports.up = async (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('name');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
