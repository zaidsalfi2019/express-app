const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const students = require('./models/students'); // import the User model
const app = express();
var bodyParser = require('body-parser')

// Set up handlebars as the view engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use('/static', express.static('static'))

// Connect to the MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/crudTest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Set up routes
// app.get('/', (req, res) => {
//   res.render('home', {});
// });

app.get('/', (req, res) => {
  students.find((err, students) => {
    if (err) return console.error(err);
    console.log(students);
    res.render('home', { students });
  });
});

app.get('/students/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.error(err);
    res.render('students', { user });
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/submit', (req, res) => {
    console.log(req)
  const student = new students({
    name: req.body.name,
    age: req.body.age,
    rollNo: req.body.rollNo,
  });


  student.save((err) => {
    if (err) return console.error(err);
    res.redirect('/');
  });
});

app.put('/students/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }, (err) => {
    if (err) return console.error(err);
    res.redirect(`/students/${req.params.id}`);
  });
});

app.delete('/students/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err) return console.error(err);
    res.redirect('/students');
  });
});

app.listen(80, () => {
  console.log('Server listening on port 80');
});