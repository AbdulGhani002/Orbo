const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        console.log('You are authorized to view this page');
        return next();
    }
    console.log('You are not authorized to view this page');
    res.redirect('/login');
};
module.exports = {isAdmin};