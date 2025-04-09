const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Chuyển pool thành Promise để dễ sử dụng async/await
const promisePool = pool.promise();

const connectDB = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('MySQL connection failed:', err.message);
      process.exit(1);
    } else {
      console.log('MySQL connected');
    }
  });
};

module.exports = { connectDB, promisePool };
