const express = require("express");
const adminController = require("../controllers/admin.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");
const { upload } = require("../middlewares/uploadFiles");

const router = express.Router();

router.get("/all-users", isAuthenticated, isAdmin, adminController.getAllUsers);
router.get("/admin-dashboard", isAuthenticated, isAdmin, adminController.getAdminHomePage);
router.post('/admin/restrict/:id', adminController.restrictUser);

router.post('/add-new-product', (req, res, next) => {
    upload.single("productImage")(req, res, (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).render("client/error", {
                message: "File upload failed. Please try again.",
            });
        }
        next();
    });
}, isAuthenticated, isAdmin, adminController.addNewProduct);

router.get("/manage-products", isAuthenticated, isAdmin, adminController.manageProducts);

router.get('/product/:id', isAuthenticated, isAdmin, adminController.getProductById);
router.post('/product/edit/:id', (req, res, next) => {
    if (req.file) {
        upload.single('productImage')(req, res, next); 
    } else {
        next(); 
    }
}, isAuthenticated, isAdmin, adminController.editProduct);

router.delete('/product/delete/:id', isAuthenticated, isAdmin, adminController.deleteProduct);

module.exports = router;
