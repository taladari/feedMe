const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
        console.log('MongoDB Connected Successfully');
    }
    catch (err) {
        console.log(err.message);
        process.exit(1); //Exit process with failure flag
    }
};

module.exports = connectDB;