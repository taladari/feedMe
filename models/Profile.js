const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    ratedRecipes: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);