const mysql = require('mysql2/promise');
const chalk = require('chalk');

const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

(async () => {
    try {
        await connection.getConnection();
        console.log(chalk.yellow(`[DATABASE]: Connection established to database: ${process.env.DB_NAME}.`));
    } catch (err) {
        console.log(chalk.yellow(`[DATABASE]:`, err));
    }
})();

module.exports = { connection };