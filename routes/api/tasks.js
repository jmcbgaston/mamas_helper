const express = require("express");
const router = express.Router();
const Task = require('../../models/Task'); 
const passport = require('passport'); 
const validateTaskInput = require('../../validation/tasks/new');
const { findByIdAndDelete } = require("../../models/Task");

router.get('/user/:user_id', (req, res) => {
  Task.find({user: req.params.user_id})
  .then(tasks => res.json(tasks))
  .catch(err =>
    res.status(404).json({ notasksfound: 'No tasks found from that user' })
  );
});

//Passport for password protection
router.post('/new', passport.authenticate('jwt', {session: false}), (req, res) => {
      const { errors, isValid } = validateTaskInput(req.body); 

      if (!isValid) {
        return res.status(400).json(errors); 
      }

    Task.findOne({ title: req.body.title, owner_id: req.user._id })
      .then(task => {
        if (task) {
          errors.task = "Task with that title already exists"; 
          return res.status(400).json(errors); 
        } else {
          // const reqSchema = new Req[req.body.requirements]
          const newTask = new Task({
            title: req.body.title,
            requirements: req.body.requirements, 
            owner_id: req.user._id
          });

          // console.log(`hello ${req.body.requirements.description}`)
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

router.patch('/:id', async (req, res) => {

  const { errors, isValid } = validateTaskInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, 
    { title: req.body.title}, 
    { new: true }
  );

  debugger;

  if (!updatedTask) return res.status(404).json({ notaskfound: 'No task found with that ID' });

  res.send(updatedTask)

});

// needs tweaking
router.delete('/:id', async (req, res) => {

  const { errors, isValid } = validateTaskInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }
  
  // we may not want to just console log here
  Task.findByIdAndDelete(req.params.id, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Deleted : ", docs); 
    } 
  }); 

});

module.exports = router;