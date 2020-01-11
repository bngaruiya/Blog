const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../db/userQueries');
const { isValidId, validUser } = require('../middleware/func');

function setUserIdCookie(req, res, id) {
  const isSecure = req.app.get('env') != 'development';
  res.cookie('user_id', id, {
    httpOnly: true,
    signed: true,
    secure: isSecure
  });
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    User.getOneByEmail(req.body.email).then(user => {
      console.log('user', user);
      if (!user) {
        // this is a unique email
        // hash password
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            imageUrl: req.body.imageUrl
          };
          User.create(user).then(id => {
            // redirect
            setUserIdCookie(req, res, user.id);
            res.json({
              id,
              message: '✔✔✔'
            });
          });
        });
      } else {
        // email already in use
        next(new Error('Email in Use!!'));
      }
    });
  } else {
    next(new Error('Invalid User!!'));
  }
});

router.post('/signin', (req, res, next) => {
  if (validUser(req.body)) {
    //Check to see the user is in the base
    User.getOneByEmail(req.body.email).then(user => {
      console.log('user', user);
      if (user) {
        // Compare password to hashed password
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            // setting the "set-cookie" header
            setUserIdCookie(req, res, user.id);
            res.json({
              result,
              message: 'Logged In'
            });
          } else {
            next(new Error('Invalid Login Details!!'));
          }
        });
      } else {
        next(new Error('User does not exist. Please sign up!!'));
      }
    });
  } else {
    next(
      new Error(
        'Invalid Login. Enter email and password. Password must be 6 characters or more.'
      )
    );
  }
});

module.exports = router;
