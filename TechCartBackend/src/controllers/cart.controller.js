import { Cart } from "./../models/cart.model.js";
import { Product } from "./../models/product.model.js";

export async function getCart(req, res) {
  try {
    let cart = await Cart.findOne({ clerkId: req.user.clerkId }).populate(
      "item.product",
    );

    if (!cart) {
      const user = req.user;

      cart = await Cart.create({
        user: user._id,
        clerkId: user.clerkId,
        items: [],
      });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.log("Error from getCart controller", error);
    res.status(500).json({ error: "Internal Server Erro" });
  }
}

export async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate if product exist and is in stock

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json("Insufficient stock");
    }

    let cart = await Cart.findOne({ clerkId: req.user.clerkId });

    if (!cart) {
      cart = await Cart.create({
        user: user._id,
        clerkId: user.clerkId,
        items: [],
      });
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (existingItem) {
      // Increment Quantity by 1
      const newQuantity = existingItem.quantity + 1;

      if (product.stock < newQuantity) {
        return res.status(400).json({ error: "Insufficient product in stock" });
      }

      existingItem.quantity = newQuantity;
    } else {
      //  Add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.log("Error from addToCart controller", error);
    res.status(500).json({ error: "Internal Server Erro" });
  }
}

export async function updateCartItem(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be atleast one" });
    }

    const cart = await Cart.findOne({ clerkId: req.user.clerkId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Check if product exist and validate stock

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.log("Error from updateCartItem controller", error);
    res.status(500).json({ error: "Internal Server Erro" });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ clerkId: req.user.clerkId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.log("Error from removeFromCart controller", error);
    res.status(500).json({ error: "Internal Server Erro" });
  }
}

export async function clearCart(req, res) {
  try {
    const cart = await Cart.findOne({ clerkId: req.user.clerkId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.log("Error from clearCart controller", error);
    res.status(500).json({ error: "Internal Server Erro" });
  }
}
