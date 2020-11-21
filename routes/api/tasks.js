const express = require("express");
const router = express.Router();
const Task = require('../../models/Task');
const passport = require('passport');
const validateTaskInput = require('../../validation/tasks/new');

router.get('/user/:user_id', (req, res) => {
  Task.find({owner_id: req.params.user_id})
  .then(tasks => res.json(tasks))
  .catch(err =>
    res.status(404).json({ notasksfound: 'No tasks found from that user' })
  );
});

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
          const newTask = new Task({
            title: req.body.title,
            requirements: req.body.requirements,
            owner_id: req.user._id
          });
          newTask.save()
          .then(task => res.json(task));
       
        }
      });
});

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
    { title: req.body.title, requirements: req.body.requirements, completed: req.body.completed, archived: req.body.archived  },
    { new: true }
  );

  if (!updatedTask) return res.status(404).json({ notaskfound: 'No task found with that ID' });
  res.send(updatedTask)

});

router.delete('/:id', function(req, res) {
  Task.findByIdAndRemove(req.params.id)
  .exec()
  .then(doc => {
    if (!doc) { return res.status(400).end(); }
    return res.status(204).end();
  })
  .catch(err => next(err))
})

module.exports = router;
