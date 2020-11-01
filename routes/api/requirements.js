const express = require("express");
const router = express.Router();
const Requirement = require('../../models/Task');
const passport = require('passport');

// router.delete('/:id', function(req, res) {
//   Requirement.findByIdAndRemove(req.params.id)
//   .exec()
//   .then(doc => {
//     if (!doc) { return res.status(400).end(); }
//     return res.status(204).end();
//   })
//   .catch(err => next(err))
// })

module.exports = router;
