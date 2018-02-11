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
  }}, {
  getterMethods: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
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
