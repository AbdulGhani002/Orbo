const db = require('../data/database');
const { ObjectId } = require('mongodb');

class Product {
    constructor(name, price, stock, imageUrl) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl || 'default-product.png';
    }

    async save() {
        try {
            const newProduct = {
                name: this.name,
                price: this.price,
                stock: this.stock,
                imageUrl: this.imageUrl
            };

            const result = await db.getDb().collection("products").insertOne(newProduct);
            return result;
        } catch (error) {
            console.error("Error saving product:", error);
            throw error;
        }
    }

    static async getAllProducts() {
        try {
            return await db.getDb().collection("products").find().toArray();
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    static async getProductById(id) {
        try {
            return await db.getDb().collection("products").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error fetching product by id:", error);
            throw error;
        }
    }

    static async deleteProduct(id) {
        try {
            await db.getDb().collection("products").deleteOne({ _id:new ObjectId(id) });
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

    static async findByIdAndUpdate(id, update) {
      try {
        console.log("Updating product with ID:", id, "Update details:", update);
        return await db.getDb().collection("products").findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: update },
          { returnOriginal: false }
        );
      } catch (error) {
        console.error("Error updating product:", error);
        throw error;
      }
    }
    
}

module.exports = Product;
