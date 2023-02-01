const tableName = 'deliveryType';

const provinces = [
  {
    label: 'PICKUP',
  },
  {
    label: 'SHIPMENT',
  },
];

exports.up = (knex) => {
  return knex(tableName).insert(provinces);
};

exports.down = (knex) => {
  return knex.raw(`TRUNCATE "delivery_type" RESTART IDENTITY CASCADE`);
};
