
const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false, // Use true if using Azure
    trustServerCertificate: true,
    enableArithAbort: true,
  }
};

// Add authentication based on configuration
if (process.env.DB_TRUSTED_CONNECTION === 'true') {
  config.options.trustedConnection = true;
} else {
  config.user = process.env.DB_USER;
  config.password = process.env.DB_PASSWORD;
}

let pool;

const connectDB = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('Connected to SQL Server database');
    }
    return pool;
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return pool;
};

module.exports = { connectDB, getPool, sql };
