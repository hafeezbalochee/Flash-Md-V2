const { Pool } = require("pg");

if (!process.env.DB_URL) {
  throw new Error("❌ DB_URL is not defined");
}

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function query(text, params = []) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

async function testDB() {
  try {
    await query("SELECT 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database error:", err.message);
  }
}

module.exports = {
  pool,
  query,
  testDB,
};

  
