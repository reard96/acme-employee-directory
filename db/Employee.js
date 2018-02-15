const _conn = require('./conn');

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
  },
  nicknames: {
    type: Sql.ARRAY(Sql.STRING),
    defaultValue: [],
    set: function(val) {
      if (typeof val === 'string') {
        let nicknames = val.split(',').filter(nickname => nickname.length > 0);
        this.setDataValue('nicknames', nicknames);
      } else {
        this.setDataValue('nicknames', val);
      }
    }
  }
}, {
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

module.exports = Employee;
