const { pool } = require('../../../config/db');

async function ping() {
  const client = await pool.query('SELECT 1');
  return client.rows?.[0] != null;
}

module.exports = { ping };
