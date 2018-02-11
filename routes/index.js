const app = require('express').Router();
const db = require('../db');
const { Employee } = db.models; // const Employee = db.models.Employee

// send routes to server file
module.exports = app;

app.get('/', (req, res, next) => {
  Employee.findAll({})
    .then(() => {
      res.render('index', { title: 'Home' });
    })
    .catch(next);
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
    // include logic to send 404 error if employee isn't found
    .then(employee => {
      res.render('employee', { title: `Employee: ${ employee.fullName }`, employee });
    })
    .catch(next);
});

app.put('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      Object.assign(employee, req.body);
      return employee.save();
    })
    .then(employee => {
      res.redirect('/employees');
    })
    .catch(next);
});

app.delete('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.destroy();
    })
    .then(employee => {
      res.redirect('/employees');
    })
    .catch(next);
});
