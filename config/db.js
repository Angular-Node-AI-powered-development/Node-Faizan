const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const configPath = path.join(__dirname, 'default.json');
const defaults = fs.existsSync(configPath)
  ? require(configPath)
  : {};
const dbConfig = defaults.db || {};

const connectionConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST || dbConfig.host,
      port: parseInt(process.env.DB_PORT || dbConfig.port, 10) || 5432,
      database: process.env.DB_NAME || dbConfig.database,
      user: process.env.DB_USER || dbConfig.user,
      password: process.env.DB_PASSWORD || dbConfig.password,
      max: dbConfig.max || 20,
      idleTimeoutMillis: dbConfig.idleTimeoutMillis || 30000,
      connectionTimeoutMillis: dbConfig.connectionTimeoutMillis || 2000,
    };

const pool = new Pool(connectionConfig);

module.exports = { pool };
