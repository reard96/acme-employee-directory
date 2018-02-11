const _conn = require('./conn');
const Employee = require('./Employee');

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
  return Promise.all(initialEmployees.map(worker => Employee.create(worker)));
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
