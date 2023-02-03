require('dotenv').config();
const humps = require('humps');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

module.exports = {
  production: {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      host: DB_HOST,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/src/database/migrations',
    },
    seeds: {
      directory: __dirname + 'src/database/seeds',
    },
    postProcessResponse: (result) => {
      return humps.camelizeKeys(result);
    },
    wrapIdentifier: (value, origImpl) => {
      return origImpl(humps.decamelize(value));
    },
  },

  development: {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      host: DB_HOST,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/src/database/migrations',
    },
    seeds: {
      directory: __dirname + '/src/database/seeds',
    },
    postProcessResponse: (result) => {
      return humps.camelizeKeys(result);
    },
    wrapIdentifier: (value, origImpl) => {
      return origImpl(humps.decamelize(value));
    },
  },

  onUpdateTrigger: (TABLE_NAME) => `
    CREATE TRIGGER updated_at
    BEFORE UPDATE ON ${TABLE_NAME}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,
};
