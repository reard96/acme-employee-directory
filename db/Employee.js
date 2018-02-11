const _conn = require('./conn');

// I don't understand these lines...
const { Sequelize } = _conn;
const Sql = Sequelize;


const Employee = _conn.define('employee', {
  firstName: {
    type: Sql.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sql.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  // to add nicknames
  // to add virtual method for full name
});

module.exports = Employee;
