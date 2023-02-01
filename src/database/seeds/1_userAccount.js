const bcrypt = require('bcryptjs');
const tableName = 'user_account';

const userAccounts = [
  {
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin', 10),
  },
];

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE "${tableName}" RESTART IDENTITY CASCADE`);

  // Insert seed entries
  return knex(tableName).insert(userAccounts);
};
