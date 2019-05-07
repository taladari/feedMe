const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');

const Profile = require('../../models/Profile');

const { check, validationResult } = require('express-validator/check');

const router = express.Router();

// @route  POST /api/users
// @desc   Registers a new user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 4 or more characters').isLength({min: 4})
    ],
    async (req, res) => {

    // Validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password } = req.body;  
    
    try {
        // See if user already exists
        let user = await User.findOne({ email });

        if (user){
            res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
        }
        
        // Create new user model
        user = new User({
            name,
            email,
            password
        });

        // Encrypt pasword 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to DB
        await user.save();

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 },
        (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;