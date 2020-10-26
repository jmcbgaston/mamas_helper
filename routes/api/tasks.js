const express = require("express");
const router = express.Router();
const Task = require('../../models/Task'); 
const passport = require('passport'); 
const validateNewTaskInput = require('../../validation/tasks/new');


//Passport for password protection

router.post('/new', passport.authenticate('jwt', {session: false}), (req, res) => {
      const { errors, isValid } = validateNewTaskInput(req.body); 

      if (!isValid) {
        return res.status(400).json(errors); 
      }

    Task.findOne({ title: req.body.title, owner_id: req.user._id })
      .then(task => {
        if (task) {
          errors.task = "Task with that title already exists"; 
          return res.status(400).json(errors); 
        } else {
          const newTask = new Task({
          title: req.body.title,
          requirements: req.body.requirements,          
          //HELP: request has a user associated with it
          owner_id: req.user._id
          });

        newTask.save()
        .then(task => res.json(task));
        }
      });
});


//bugfix
//we don't check if the user is assigned to that task
//need to check the owner_id matching 'req.user._id'
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err =>
        res.status(404).json({notaskfound: 'No task found with that ID'}));
});

module.exports = router;