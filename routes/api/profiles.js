const express = require('express');
const User = require('../../models/User');
const Profile = require('../../models/Profile');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Profiles routes');
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
    console.log('In profile POST route ', ratedRecipes, id);
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

module.exports = router;