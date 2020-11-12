const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email,
        household: req.user.household,
        isLimitedUser: req.user.isLimitedUser,
        assignedTasks: req.user.assignedTasks,
        parentId: req.user.parentId
    });
})

router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ handle: req.body.handle })
  .then( (user) => {
      if (user) {
        errors.handle = "That handle is taken!";
        return res.status(400).json(errors);

      } else {
        User.findOne({ email: req.body.email })
        .then(user => {
          if (user) {
            errors.email = "That email is taken!";
            return res.status(400).json(errors);

          } else {
            User.findOne({ _id: req.body.parentId })
            .then(pId => {
              if (!pId) {
                errors.parentId = "This user does not exist";
                return res.status(400).json(errors);
              } else {
                const newUser = new User({
                  handle: req.body.handle,
                  email: req.body.email,
                  password: req.body.password, 
                  household: req.body.household,
                  isLimitedUser: req.body.isLimitedUser,
                  assignedTasks: req.body.assignedTasks,
                  parentId: req.body.parentId
                })
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err));
                  })
                })
              }
            })
    
          }
        })

      }
    })
})

router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if (!user) {
        errors.email = 'User not found!';
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              handle: user.handle, 
              household: user.household, 
              assignedTasks: user.assignedTasks, 
              isLimitedUser: user.isLimitedUser, 
              parentId: user.parentId
            };

             jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
          });
        });
          } else {
            errors.password = 'Correct password, please!'
            return res.status(400).json(errors);
          }
        })
    })
})



module.exports = router;
