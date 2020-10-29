const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');
const User = require('../../models/User');
const Task = require('../../models/Task');

router.post('/new', (req, res) => {
  sgMail.setApiKey(keys.sendGridApiKey);

  const msg = {
    to: req.body.email,
    from: keys.verifiedSender,
    subject: `<h1>Mama's Helper: Daily Tasks for ${req.body.handle}</h1>`,
    html: req.body.html
  }

  sgMail
  .send(msg)
  .then(() => {
    res.json(msg);
  })
  .catch((err) => {
    const { message, code, response: { body: { errors }}} = err;
    res.json({ message, code, errors });
  })
})

module.exports = router;
