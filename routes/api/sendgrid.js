const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');

router.get("/test", (req, res) => res.json({ msg: "This is the sendgrid route" }));

router.post('/', () => {

  sgMail.setApiKey(keys.sendGridApiKey);
  const receiver = 'una.schmitt50@ethereal.email';

  const msg = {
    to: receiver, // Change to your recipient
    from: keys.verifiedSender, // Change to your verified sender
    subject: "Mama's Helper: Daily Tasks",
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((err) => {
    console.error(err)
  })
})

module.exports = router;
