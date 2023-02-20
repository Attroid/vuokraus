const { faker } = require('@faker-js/faker');

const tableName = 'product';

function createRandomProduct() {
  return {
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.datatype.number(1000),
    imageUrl: 'https://i.ibb.co/tLM2MXF/photo-2023-02-02-19-20-34.jpg',
    thumbUrl: 'https://i.ibb.co/g4MWMVh/photo-2023-02-02-19-20-34.jpg',
    conditionId: faker.datatype.number({ min: 1, max: 5 }),
    tradeTypeId: faker.datatype.number({ min: 1, max: 5 }),
    provinceId: faker.datatype.number({ min: 1, max: 19 }),
    deliveryTypeId: faker.datatype.number({ min: 1, max: 2 }),
    categoryId: faker.datatype.number({ min: 1, max: 6 }),
    userAccountId: 1,
  };
}

const products = [];

Array.from({ length: Math.pow(10, 3) }).forEach(() => {
  products.push(createRandomProduct());
});

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE "${tableName}" RESTART IDENTITY CASCADE`);

  // Insert seed entries
  return knex(tableName).insert(products);
};
