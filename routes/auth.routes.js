const express = require("express");
const authController = require("../controllers/auth.controllers");
const { upload } = require("../middlewares/uploadFiles");

const router = express.Router();

router.get("/signup", authController.getSignup);
router.get("/login", authController.getLogin);
router.post(
  "/signup",
  (req, res, next) => {
    upload.single("profilePic")(req, res, (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).render("client/error", {
          message: "File upload failed. Please try again.",
        });
      }
      next();
    });
  },
  authController.signup
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
module.exports = router;
