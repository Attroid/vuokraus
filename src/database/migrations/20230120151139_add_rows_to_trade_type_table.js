const tableName = 'tradeType';

const tradeTypes = [
  {
    label: 'SELLING',
  },
  {
    label: 'BUYING',
  },
  {
    label: 'RENTING',
  },
  {
    label: 'WANTING_TO_RENT',
  },
  {
    label: 'GIVING_AWAY',
  },
];

exports.up = (knex) => {
  return knex(tableName).insert(tradeTypes);
};

exports.down = (knex) => {
  return knex.raw(`TRUNCATE "trade_type" RESTART IDENTITY CASCADE`);
};
