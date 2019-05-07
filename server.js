const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json({extended: false}));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/contact', require('./routes/api/contact'));

app.listen(port, () => console.log(`Server is listening on port ${port}`));