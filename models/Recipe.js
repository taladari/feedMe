const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: Array,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    image: String,
    fat: Number,
    calories: Number,
    protein: Number,
    rating: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('recipes', RecipeSchema);