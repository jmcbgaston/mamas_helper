const express = require("express");
const router = express.Router();
const Task = require('../../models/Task'); 
// const Req = require('../../models/Req'); 
const passport = require('passport'); 
const validateTaskInput = require('../../validation/tasks/new');

// route to get all current users tasks
// "/api/tasks/user/:id"
router.get('/user/:user_id', (req, res) => {
  Task.find({user: req.params.user_id})
  .then(tasks => res.json(tasks))
  .catch(err =>
    res.status(404).json({ notasksfound: 'No tasks found from that user' })
  );
});

//Passport for password protection
// route to create a new task

// on Task creation, requirements is an empty array // WORKS
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

// route to get a single task // WORKS
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err =>
        res.status(404).json({notaskfound: 'No task found with that ID'}));
});

// router.patch('/:id',
//   passport.authenticate('jwt', { session: false }), 
//   (req, res) => {
//     const { errors, isValid } = validateTaskInput(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors)
//     }

//     const updatedTask = Task.findOneAndUpdate(req.params.id)
//       .then(task => res.json(task))
//       .catch(err => 
//         res.status(404).json({notaskfound: 'No task found with that ID'}));

//       updatedTask.description = req.body.description
//       updatedTask.requirements = req.body.requirements

//       updatedTask.save()
//         .then(task => res.json(task))
//         .catch(err => 
//           res.status(400).json(errors))
//   }

// );

router.patch('/:id', async (req, res) => {

  const { errors, isValid } = validateTaskInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title
  }, { new: true });

  if (!updatedTask) return res.status(404).json(      {notaskfound: 'No task found with that ID'}
  );

});

// router.put('/:id', async (req, res) => {
//   const { error } = validateProduct(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const product = await Product.findByIdAndUpdate(req.params.id, 
//     { 
//      name: req.body.name,
//      description: req.body.description,
//      category: req.body.category,
//      tags: req.body.tags,
//      withdrawn: req.body.withdrawn,
//      extraData: {
//        brand: req.body.extraData.brand,
//        quantity: req.body.extraData.quantity,
//        type: req.body.extraData.type
//      } 
//    }, 
//    {new: true}
//   );

//   if (!product) return res.status(404).json({notaskfound: 'No task found with that ID'}));

//   res.send(product);
// });

router.delete('/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors)
    }

    Task.findById(req.params.id).delete
  }  
);

module.exports = router;