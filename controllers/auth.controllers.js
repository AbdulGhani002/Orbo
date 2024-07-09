const getSignup = (req, res) => {
    res.render('client/auth/signup');
};
const getLogin = (req, res) => {
    res.render('client/auth/login');
}
module.exports = {
    getSignup,
    getLogin
}