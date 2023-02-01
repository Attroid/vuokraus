const tableName = 'condition';

const conditions = [
  {
    label: 'NEW',
  },
  {
    label: 'EXCELLENT',
  },
  {
    label: 'GOOD',
  },
  {
    label: 'DECENT',
  },
  {
    label: 'BAD',
  },
];

exports.up = (knex) => {
  return knex(tableName).insert(conditions);
};

exports.down = (knex) => {
  return knex.raw(`TRUNCATE "condition" RESTART IDENTITY CASCADE`);
};
