const _conn = require('./conn');
const Employee = require('./Employee');

const initialEmployees = [
                          {firstName: 'Ted', lastName: 'Mosby', nicknames: ['T-Dog', 'Schmosby']},
                          {firstName: 'Barney', lastName: 'Stinson', nicknames: ['Legendary', 'The Barnacle']},
                          {firstName: 'Lily', lastName: 'Aldrin', nicknames: ['Little Fudge', 'Mom']},
                          {firstName: 'Marshall', lastName: 'Eriksen', nicknames: ['Big Fudge', 'Judge Fudge']},
                          {firstName: 'Robin', lastName: 'Sherbatsky', nicknames: ['Canadian']}
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
