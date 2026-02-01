import pg from "pg";

const { Pool } = pg;

if (!process.env.DB_URL) {
  throw new Error("❌ DB_URL is not defined in environment variables");
}

export const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Run a query
 * @param {string} text
 * @param {Array} params
 */
export async function query(text, params = []) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

/**
 * Test DB connection
 */
export async function testDB() {
  try {
    await query("SELECT 1");
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}
