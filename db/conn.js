const Sql = require('sequelize');

const conn = new Sql(process.env.DATABASE_URL || 'postgres://localhost/acme_employee_directory_db');

module.exports = conn;
