import { Product } from "../models/product.model.js";

export async function getAllProducts(_, res) {
  try {
    // The -1 means in descending order, so the most recent products will be returned first
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ error: "product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.log("Error from getProductById", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
