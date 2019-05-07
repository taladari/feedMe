const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SimilarRecipesSchema = new Schema({
    recipeId: {
        type: String,
        required: true
    },
    similarRecipes: Schema.Types.Mixed
});

module.exports = SimilarRecipes = mongoose.model('similarrecipes', SimilarRecipesSchema);