const app = require('express').Router();
const db = require('../db');
const { Employee } = db.models; // const Employee = db.models.Employee

// send routes to server file
module.exports = app;

app.use((req, res, next) => {
  Employee.findAll()
    .then(employees => {
      const nicknameCount = employees.reduce((sum, employee) => {
        return sum + employee.nicknames.length;
      }, 0);

      res.locals.employeeCount = employees.length;
      res.locals.nicknameCount = nicknameCount;
      res.locals.path = req.url;
      next();
    })
    .catch(next);
});

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
    .catch(next);
});

app.get('/employees', (req, res, next) => {
  Employee.findAll({})
    .then(employees => {
      res.render('employees', { title: 'Employees', employees });
    })
    .catch(next);
});

app.get('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      if (!employee) {
        res.status(404).render('error', { title: 'Error' });
      }
      res.render('employee', { title: `Employee: ${ employee.fullName }`, employee });
    })
    .catch(next);
});

app.post('/employees', (req, res, next) => {
  Employee.create(req.body)
    .then(employee => {
      res.redirect(`/employees/${employee.id}`);
    })
    .catch(next);
});

app.put('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      Object.assign(employee, req.body);
      return employee.save();
    })
    .then(() => {
      res.redirect('/employees');
    })
    .catch(next);
});

app.delete('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.destroy();
    })
    .then(() => {
      res.redirect('/employees');
    })
    .catch(next);
});
