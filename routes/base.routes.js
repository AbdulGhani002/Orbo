const express = require("express");
const baseController = require("../controllers/base.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
router.get("/",isAuthenticated, baseController.getHome);
router.get('/profile' , isAuthenticated , baseController.getProfilePage);
router.get('/edit-profile',isAuthenticated,baseController.getEditProfilePage)
module.exports = router;