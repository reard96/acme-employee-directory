const express = require('express');
// const path = require('path');
const db = require('./db');
const { Employee } = db.models; // const Employee = db.models.Employee

const app = express();

app.get('/', (req, res, next)=>{
  Employee.findAll()
    .then( employees => {
      res.send(employees);
    });
});

// const nunjucks = require('nunjucks');

// nunjucks.configure({ noCache: true });

// app.set('view engine', 'html');
// app.engine('html', nunjucks.render);

// app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
// app.use(require('method-override')('_method'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

// app.use((req, res, next) => {
//   res.locals.path = req.url;
//   next();
// });

// const employee = db.models.Employee;

db.sync()
  .then(() => db.seed());
