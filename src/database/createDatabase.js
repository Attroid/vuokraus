require('dotenv').config();
const { Client } = require('pg');

const createDatabase = async () => {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = process.env;

  console.log(DB_USER);

  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: 'postgres',
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  console.log('Connecting to database "postgres"...');

  try {
    await client.connect();
  } catch (error) {
    console.log(error.message);
    return;
  }

  console.log('Creating database ' + DB_NAME + '...');

  const query = `CREATE DATABASE ${DB_NAME}`;

  client.query(query, (error, response) => {
    if (error) {
      if (error.message.startsWith('syntax error at or near')) {
        console.log(
          `error: malformatted database name "${DB_NAME}". ${error.message}`
        );
      } else {
        console.log(error.message);
      }
    } else {
      console.log('Created database ' + DB_NAME);
    }

    client.end();
  });
};

createDatabase();
