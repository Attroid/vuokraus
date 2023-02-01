const tableName = 'deliveryType';

exports.up = async (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('label');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
