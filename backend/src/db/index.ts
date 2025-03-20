import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "rootpassword",
  database: "BEMED",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  }
  if (connection) {
    const cc = connection.config;
    console.log(
      `Connected to the database (${cc.database}) at ${cc.user}@${cc.host}:${cc.port}`
    );
    connection.release();
  }
});

const promisePool = pool.promise();
export default promisePool;
