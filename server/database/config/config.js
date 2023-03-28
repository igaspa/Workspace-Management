const { schemeName } = require('../../utils/constants');
const envArg = process.argv.find(x => x.startsWith('--env'));
if (envArg) {
  const env = envArg.split('=')[1];
  require('dotenv').config({ path: `../.env.${env}` });
}

module.exports =
{
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    migrationStorageTableSchema: schemeName,
    schema: schemeName,
    searchPath: schemeName,
    dialectOptions: {
      prependSearchPath: true
    },
    define: {
      freezeTableName: true,
      underscored: true
    }
  },
  stage: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  }
};
