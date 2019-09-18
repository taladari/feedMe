const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Recipe = require('../../models/Recipe');
const getSuggestions = require('../../suggestions/algo');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Profiles routes');
});

router.get('/suggestions', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const profile = await Profile.findOne({ user: id });
        if (!profile) res.status(401).json({ msg: 'User profile not found' });

        const recipesObj = await getSuggestions(profile, 20);
        let recipes = Object.keys(recipesObj);

        recipes = await Recipe.find({ '_id': { "$in": recipes } });

        res.json(recipes);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Server error' });
    }

});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(400).json({ msg: "Invalid profile request" });
        const profile = await Profile.findOne({ user: user.id });
        if (!profile) return res.status(400).json({ msg: "Profile not found" });
        return res.json({ profile });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Server error" });
    }
});

router.post('/', async (req, res) => {
    const { id, ratedRecipes } = req.body;
    // check for number of recipes etc
    try {
        const user = await User.findById(id);      
        if (!user) return res.status(400).json({ msg: 'Could not find requested user'});

        let profile = await Profile.findOne({ user: user.id });

        if (profile) return res.status(400).json({ msg: 'Profile already exists' });

        profile = new Profile({
            user: user.id,
            ratedRecipes
        });

        await profile.save();
        console.log('success');
        return res.json({ msg: "success" });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Failed to save user profile" });
    }
});


router.post('/rate', auth, async (req, res) => {
    const { recipeId, score } = req.body;

    try {
        const user = await User.findById(req.user.id).select('-password');  
        const profile = await Profile.findOne({ user: user })   
        if (!user) return res.status(400).json({ msg: 'Could not find requested user'});
        const idRecipe = recipeId._id
        const option = { "upsert": false };
        const query = { user: user };
        const update = {
            "$set": {
              "ratedRecipes": {
                ...profile.ratedRecipes,
                [idRecipe]: score
              }
            }
          };
        await Profile.updateOne(query, update, option).then(result => {
            console.log(`Successfully added`,profile.ratedRecipes)
          });
        res.json({});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Failed to save user profile" });
    }
});

module.exports = router;