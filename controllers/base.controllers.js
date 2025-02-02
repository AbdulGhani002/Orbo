const User = require('../models/User.model');
const Product = require("../models/Product.model");

const getHome = async (req, res) => {
    if(req.session.isAdmin){
        return res.redirect('/admin-dashboard');
    }
    const products = await Product.getAllProducts();
    return res.render("client/home" , {products});
}

const getProfilePage = async (req, res) => {
    const sessionUserEmail = req.session.user.email;
        const user = await User.getUser(sessionUserEmail);

        if (!user) {
            return res.status(404).render('client/error', { message: 'User not found' });
        }

        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            profilePicPath: user.profilePicPath,
        }
    res.render("client/profile" , {user: userData});
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
            postalCode: user.postalCode,
        }

        res.render('client/edit-profile', { user: userData });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).render('client/error', { message: 'Internal Server Error' });
    }
}

const postEditProfilePage = async (req, res) => {
    try {
        const sessionUserEmail = req.session.user.email;
        const user = await User.getUser(sessionUserEmail);

        if (!user) {
            return res.status(404).render('client/error', { message: 'User not found' });
        }

        const { name, phone, city,street, country, postalCode } = req.body;
        const profilePicPath = req.file ? req.file.filename : user.profilePicPath;

        const updatedUser = new User('', '', name, phone, city, street, country, postalCode, profilePicPath);
        const result = await updatedUser.updateUser(sessionUserEmail);

        if (result.modifiedCount > 0) {
            return res.redirect('/profile');
        } else {
            return res.redirect('/profile');
        }

    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).render('client/error', { message: 'Internal Server Error' });
    }
}

module.exports = {
    getHome,
    getProfilePage,
    getEditProfilePage,
    postEditProfilePage
}
