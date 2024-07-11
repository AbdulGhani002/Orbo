const User = require('../models/User.model');

const getHome = (req, res) => {
    res.render("client/home");
}

const getProfilePage = (req, res) => {
    res.render("client/profile");
}

const getEditProfilePage = async (req, res) => {
    try {
        const sessionUserEmail = req.session.user.email;
        const user = await User.getUser(sessionUserEmail);

        if (!user) {
            return res.status(404).render('client/error', { message: 'User not found' });
        }

        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            city: user.city,
            street: user.street,
            country: user.country,
            postalCode: user.postalCode
        }

        res.render('client/edit-profile', { user: userData });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).render('client/error', { message: 'Internal Server Error' });
    }
}

module.exports = {
    getHome,
    getProfilePage,
    getEditProfilePage
}
