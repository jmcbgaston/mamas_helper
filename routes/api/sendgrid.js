const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');
const User = require('../../models/User');
const Task = require('../../models/Task');

router.get("/test", (req, res) => res.json({ msg: "This is the sendgrid route" }));

router.post('/', (req, res) => {

  sgMail.setApiKey(keys.sendGridApiKey);
  const receiver = 'una.schmitt50@ethereal.email';

  const msg = {
    to: receiver, // Change to your recipient
    from: keys.verifiedSender, // Change to your verified sender
    subject: "Mama's Helper: Daily Tasks",
    text: 'Theses are your tasks with requirements for the day.',
    html: '<strong>Theses are your tasks with requirements for the day.</strong>',
  }

  sgMail
  .send(msg)
  .then((res) => {
    console.log('Email sent');
  })
  .catch((err) => {
    console.error(err);
  })
})

module.exports = router;
