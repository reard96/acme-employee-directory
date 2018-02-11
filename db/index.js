// const conn = require('./conn.js');

const Sql = require('sequelize');

const _conn = new Sql(process.env.DATABASE_URL);

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
});

const initialEmployees = [
                          {firstName: 'ted', lastName: 'mosby'},
                          {firstName: 'barney', lastName: 'stinson'},
                          {firstName: 'lily', lastName: 'aldrin'},
                          {firstName: 'marshall', lastName: 'eriksen'},
                          {firstName: 'robin', lastName: 'sherbatsky'}
                         ];

const sync = () => {
  return _conn.sync( {force: true} );
};

const seedEmployees = () => {
  return Promise.all(initialEmployees.map(employee => Employee.create(employee)));
};

const seed = () => {
  return seedEmployees();
};

module.exports = {
  models: {
    Employee
  },
  sync,
  seed
};
