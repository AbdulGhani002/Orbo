const express = require("express");
const baseController = require("../controllers/base.controllers")
const router = express.Router();
router.get("/", baseController.getHome);
module.exports = router;