const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


const getSignup = (req, res) => {
    res.render('client/auth/signup');
};


const getLogin = (req, res) => {
    res.render('client/auth/login');
};


const signup = [
    body('name').notEmpty().withMessage('Name is required').trim().escape(),
    body('phone').notEmpty().withMessage('Phone number is required').trim().escape(),
    body('street').notEmpty().withMessage('Street is required').trim().escape(),
    body('city').notEmpty().withMessage('City is required').trim().escape(),
    body('country').notEmpty().withMessage('Country is required').trim().escape(),
    body('postalCode').notEmpty().withMessage('Postal code is required').trim().escape(),
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, phone, street, city, country, postalCode, email, password } = req.body;

        try {

            const user = new User( email, password,name, phone, street, city, country, postalCode);
            await user.signup();

            res.status(201).json({ message: 'User signed up successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
];


const login = [
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const newUser = new User(email, password);
            const user  = await User.login(newUser);;

            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
            res.status(200).json({ message: 'User logged in successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
];

module.exports = {
    getSignup,
    getLogin,
    signup,
    login
};
