const express = require("express");
const adminController = require("../controllers/admin.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {isAdmin} = require("../middlewares/isAdmin");

const router = express.Router();


router.get("/all-users" , isAuthenticated, isAdmin, adminController.getAllUsers);

router.post('/admin/restrict/:id', adminController.restrictUser);


module.exports = router;
