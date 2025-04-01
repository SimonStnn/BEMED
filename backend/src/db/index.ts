import mysql from "mysql2";
import { inDocker, type EnvVariable } from "@/utils";

const { BEMED_DB_NAME, BEMED_DB_USERNAME, BEMED_DB_PASSWORD } =
  process.env as Record<EnvVariable, string>;

const DB_HOST = !inDocker() ? "localhost" : "db";
const DB_PORT = 3306;

console.log(
  `Connecting to the ${BEMED_DB_NAME}@${DB_HOST}:${DB_PORT} database as "${BEMED_DB_USERNAME}"...`
);

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: BEMED_DB_USERNAME,
  password: BEMED_DB_PASSWORD,
  database: BEMED_DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    if ((err as any).fatal) {
      if (err.code === "ECONNREFUSED")
        console.info(
          "Is the database running? The database could still be starting. If this message persists, check the database logs."
        );
      console.error("Database connection error");
      throw err;
    }
    console.error("Error connecting to the database", err);
  }
  if (connection) {
    const cc = connection.config;
    console.log(
      `Connected to the database ${cc.database} at ${cc.user}@${cc.host}:${cc.port}`
    );
    connection.release();
  }
});

const promisePool = pool.promise();
export default promisePool;
