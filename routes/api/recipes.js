const express = require('express');
const Recipe = require('../../models/Recipe');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Recipes routes');
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

module.exports = router;