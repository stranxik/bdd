const mongoose = require('mongoose');
const express = require('express');
const faker = require('faker');

var app = express();

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  }
}, {
  timestamps: true
});



var User = mongoose.model('User', userSchema);

app.get('/users', function (req, res, next) {
  User.find(function (err, users) {
    if (err)
      next(err);
    else
      res.json(users);
  });
});

app.get('/users/new', function (req, res, next) {
  var obj = {
    name: faker.name.findName(),
    email: faker.internet.email()
  };
  User.create(obj, function (err, user) {
    if (err)
      next(err);
    else
      res.json(user);
  });
});

var bookSchema = new mongoose.Schema({
  name: String,
  category: String, 
  stock: Number, 
  users: Array, 
});

var book = mongoose.model('book', bookSchema)

app.get("/book", function(req, res){
  book.find(function(err, bdd){
    if (err){
      res.send(err);
    }
    res.json({bdd});
  })
})
app.post('/book/new', function (req, res, next) {
  book.find(function(err, bdd){
    if (err){
      res.send(err);
    }
    var obj = {
      name: faker.name.findName(),
      category: req.body.category,
      stock: req.body.stock,
      users: bdd.users.push(req.body.users)
    };
    book.create(obj, function (err, bdd) {
      if (err)
        next(err);
      else
        res.json(bdd);
    });
  })
});

app.get("book")

mongoose.connect('mongodb://localhost:27017/sample', function (err) {

  if (err) throw err;

  app.listen(8080, function () {
    console.log('Listen started');
  });
});