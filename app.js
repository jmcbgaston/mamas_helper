const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const passport = require('passport');
const tasks = require("./routes/api/tasks");
const emails = require("./routes/api/emails");
const path = require('path');

//add tasks router to router

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
    .set('useFindAndModify', false)
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Mongo Working!! =)"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/emails", emails);
