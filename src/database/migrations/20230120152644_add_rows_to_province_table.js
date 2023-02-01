const tableName = 'province';

const provinces = [
  {
    name: 'Ahvenanmaa',
  },
  {
    name: 'Etelä-Karjala',
  },
  {
    name: 'Etelä-Pohjanmaa',
  },
  {
    name: 'Etelä-Savo',
  },
  {
    name: 'Kainuu',
  },
  {
    name: 'Kanta-Häme',
  },
  {
    name: 'Keski-Pohjanmaa',
  },
  {
    name: 'Keski-Suomi',
  },
  {
    name: 'Kymenlaakso',
  },
  {
    name: 'Lappi',
  },
  {
    name: 'Pirkanmaa',
  },
  {
    name: 'Pohjanmaa',
  },
  {
    name: 'Pohjois-Karjala',
  },
  {
    name: 'Pohjois-Pohjanmaa',
  },
  {
    name: 'Pohjois-Savo',
  },
  {
    name: 'Päijät-Häme',
  },
  {
    name: 'Satakunta',
  },
  {
    name: 'Uusimaa',
  },
  {
    name: 'Varsinais-Suomi',
  },
];

exports.up = (knex) => {
  return knex(tableName).insert(provinces);
};

exports.down = (knex) => {
  return knex.raw(`TRUNCATE "province" RESTART IDENTITY CASCADE`);
};
