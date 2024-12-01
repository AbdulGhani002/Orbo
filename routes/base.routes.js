const express = require("express");
const upload = require('../middlewares/uploadFiles');

const baseController = require("../controllers/base.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
router.get("/",isAuthenticated, baseController.getHome);
router.get('/profile' , isAuthenticated , baseController.getProfilePage);
router.get('/edit-profile',isAuthenticated,baseController.getEditProfilePage);
router.post('/edit-profile',isAuthenticated,upload.single('profile-picture'),baseController.postEditProfilePage);
module.exports = router;