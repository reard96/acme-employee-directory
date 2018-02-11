const _conn = require('./conn');
const Employee = require('./Employee');

const initialEmployees = [
                          {firstName: 'Ted', lastName: 'Mosby'},
                          {firstName: 'Barney', lastName: 'Stinson'},
                          {firstName: 'Lily', lastName: 'Aldrin'},
                          {firstName: 'Marshall', lastName: 'Eriksen'},
                          {firstName: 'Robin', lastName: 'Sherbatsky'}
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
