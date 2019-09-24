const express = require('express');
const Recipe = require('../../models/Recipe');
const SimilarRecipes = require('../../models/SimilarRecipes');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await SimilarRecipes.find())
    //res.send('Recipes routes');
});

router.get('/:num', async (req, res) => {
    try {
        const recipes = await Recipe.find({ rating: { $ne: null }, desc: { $ne: null }, image: { $ne: 'None' } }).sort({ 'rating': -1 }).limit(parseInt(req.params.num));
        res.json(recipes);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'error finding recipes' });
    }
});

router.get('/vegan/:num', async (req, res) => {
    try {
        const recipes = await Recipe.find({ categories: { $in: [ "Vegan", "Vegetarian" ]} }).sort({ 'rating': -1 }).limit(parseInt(req.params.num));
        res.json(recipes);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'error finding recipes' });
    }
});

router.get('/gluten-free/:num', async (req, res) => {
    try {
        const recipes = await Recipe.find({ categories: "Wheat/Gluten-Free" }).sort({ 'rating': -1 }).limit(parseInt(req.params.num));
        res.json(recipes);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'error finding recipes' });
    }
});

module.exports = router;