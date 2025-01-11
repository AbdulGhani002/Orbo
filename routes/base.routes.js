const express = require("express");

const baseController = require("../controllers/base.controllers");
const adminController = require("../controllers/admin.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {isAdmin} = require("../middlewares/isAdmin");
const router = express.Router();
router.get("/adminHome" , isAuthenticated , isAdmin , adminController.getAdminHomePage);
router.get("/",isAuthenticated, baseController.getHome);
router.get('/profile' , isAuthenticated , baseController.getProfilePage);
router.get('/edit-profile',isAuthenticated,baseController.getEditProfilePage);
router.post(
    "/edit-profile",
    isAuthenticated,
    baseController.postEditProfilePage
);
module.exports = router;