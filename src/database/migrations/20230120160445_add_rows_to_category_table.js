const tableName = 'category';

const categories = [
  {
    label: 'ART',
  },
  {
    label: 'PETS',
  },
  {
    label: 'FASHION',
  },
  {
    label: 'FOOD',
  },
  {
    label: 'SPORTS',
  },
  {
    label: 'TECHNICS',
  },
];

exports.up = (knex) => {
  return knex(tableName).insert(categories);
};

exports.down = (knex) => {
  return knex.raw(`TRUNCATE "category" RESTART IDENTITY CASCADE`);
};
