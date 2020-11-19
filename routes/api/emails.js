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
    subject: `Mama's Helper: Daily Tasks for ${req.body.handle}`,
    templateId: 'd-beb10ea6d81b412c86dfba4161ccd41f',
    dynamic_template_data: {
      tasks: req.body.tasks,
      handle: req.body.handle
    }
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
