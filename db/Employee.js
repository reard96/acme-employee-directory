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
        // need to edit this
        const nicknames = val.split(',').filter(nickname => nickname.length > 0);
        this.setDataValue('nicknames', val.split(','));
      } else {
        this.setDataValue('nicknames', val);
      }
    }
  }}, {
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});
//   setterMethods: {
//     fullName(value) {
//       const names = value.split(' ');
//       this.setDataValue('firstName', names.slice(0, -1).join(' '));
//       this.setDataValue('lastName', names.slice(-1).join(' '));
//     },
//   }
// }
  // to add nicknames


module.exports = Employee;


// const Foo = sequelize.define('foo', {
//   firstname: Sequelize.STRING,
//   lastname: Sequelize.STRING
// }, {
//   getterMethods: {
//     fullName() {
//       return this.firstname + ' ' + this.lastname
//     }
//   },

//   setterMethods: {
//     fullName(value) {
//       const names = value.split(' ');

//       this.setDataValue('firstname', names.slice(0, -1).join(' '));
//       this.setDataValue('lastname', names.slice(-1).join(' '));
//     },
//   }
// });
