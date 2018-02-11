const app = require('express').Router();
const db = require('../db');
const { Employee } = db.models; // const Employee = db.models.Employee

// send routes to server file
module.exports = app;

app.get('/', (req, res, next) => {
  res.render('index');
  next();
  // Employee.findAll({})
  //   .then(employees => {
  //     res.render('employees', { employees, title: 'Home' });
  //   })
  //   .catch(next);
});

app.get('/employees', (req, res, next) => {
  Employee.findAll({})
    .then(employees => {
      res.render('employees', { employees, title: 'Employees' });
    })
    .catch(next);
});

app.get('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      res.render('employee', { title: `Employee: ${ employee.fullName }`, employee });
    })
    .catch(next);
});

// app.post('/employees', (req, res, next) => {
//   Employee.create(req.body)
//     .then(() => res.redirect('/employees'))
//     .catch(next);
// });

app.delete('/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.destroy();
    })
    .then(() => res.redirect('/employees'))
    .catch(next);
});
