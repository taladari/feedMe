const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const passport = require('passport');

const port = process.env.PORT || 5000;
const app = express();

mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log(err));

app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport.js')(passport);

app.use('/api/users', require('./routes/api/users'));

app.listen(port, () => console.log(`Server is listening on port ${port}`));