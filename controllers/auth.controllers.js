const User = require('../models/User.model');
const getSignup = (req, res) => {
    res.render('client/auth/signup');
};
const getLogin = (req, res) => {
    res.render('client/auth/login');
}
const signup = async (req, res) => {
    try {
        const {name, phone, street, city, country, postalCode, email, password} = req.body;
        const user = new User(name, phone, street, city, country, postalCode, email, password);
        await user.signup();
    } catch (error) {
        res.status(400).send(error);
    }
}
const login = async (req, res) => {
    try {
        const user = await User.login(new User(req.body.email, req.body.password));
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getSignup,
    getLogin,
    signup,
    login
}