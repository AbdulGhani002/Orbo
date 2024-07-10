const getHome = (req, res) => {
    res.render("client/home");
}
const getProfilePage = (req, res) => {
    res.render("client/profile");
}

module.exports = {
    getHome,
    getProfilePage
}