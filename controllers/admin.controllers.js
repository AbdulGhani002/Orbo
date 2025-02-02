const Product = require("../models/Product.model");
const User = require("../models/User.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.render("admin/all-users", { users });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const restrictUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndUpdate(userId, { isAdmin: false });
  res.redirect("/admin/users");
};

const getAdminHomePage = (req, res) => {
  const adminName = req.session.user.username;
  res.render("admin/home", { admin: adminName });
};

const manageProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.render("admin/products/products-dashboard", { products });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const productPic = req.file ? `/uploads/${req.file.filename}` : "/images/default.png";
    const { name, price, stock } = req.body;

    const newProduct = new Product(name, parseFloat(price), parseInt(stock), productPic);
    const result = await newProduct.save();

    res.json({
      id: result.insertedId,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      imageUrl: productPic
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

const editProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, stock } = req.body;
  let imageUrl = req.file ? `/uploads/${req.file.filename}` : "/images/default.png";

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, stock, imageUrl });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};


const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.deleteProduct(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.getProductById(productId);
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
};

module.exports = {
  getAllUsers,
  restrictUser,
  getAdminHomePage,
  manageProducts,
  addNewProduct,
  editProduct,
  deleteProduct,
  getProductById
};
