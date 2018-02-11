const express = require('express');
const path = require('path');
const db = require('./db');
const nunjucks = require('nunjucks');

const { Employee } = db.models; // const Employee = db.models.Employee

const app = express();
// testing
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

nunjucks.configure({ noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(require('method-override')('_method'));

// so I can deliver the image file
app.use(express.static('/'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
});

app.use('/', require('./routes/index.js'));

db.sync()
  .then(() => db.seed());
