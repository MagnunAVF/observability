const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const query = (text, params) => pool.query(text, params);

const checkDbHealth = async () => {
  await query("SELECT 1");
};

module.exports = {
  checkDbHealth,
  query,
};
