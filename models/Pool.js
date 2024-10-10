require("dotenv").config();
const { Pool } = require("pg");

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_NAME,
    DB_NAME_TESTING,
    NODE_ENV } = process.env;

let dbName;

if (NODE_ENV === "test") {
    dbName = DB_NAME_TESTING;
} else {
    dbName = DB_NAME;
}
module.exports = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: dbName,
    port: DB_PORT,
});