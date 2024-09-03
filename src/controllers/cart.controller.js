import { cartRepository, productRepository, ticketRepository } from "../repository/index.js";
import { v4 as uuidv4 } from "uuid";
import { mailService } from "../services/mail.service.js";

class CartController {
  async addCart(req, res) {
    try {
      const cart = await cartRepository.create({ products: [] });
      res.status(200).json({ result: "Success", message: cart });
    } catch (error) {
      res.status(500).json({ result: "Error", message: error });
    }
  }

  async getAll(req, res) {
    try {
      const carts = await cartRepository.getAll();
      res.status(200).json({ response: "Success", carts });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async getById(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartRepository.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });
      res.status(200).json({ response: "Success", message: cart });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await cartRepository.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });

      const product = await productRepository.getById(pid);
      if (!product)
        return res.status(404).json({ response: "Error", message: "Product not found" });

      //Stock control
      if (quantity > product.stock)
        return res.status(404).json({
          response: "Error",
          message: "Out of stock",
          in_stock: product.stock,
        });

      if (quantity < 1)
        return res
          .status(404)
          .json({ response: "Error", message: "Quantity cannot be less than 1" });

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.product._id.toString() === pid.toString()
      );

      if (existingProductIndex !== -1) {
        if (cart.products[existingProductIndex].quantity + quantity > product.stock)
          return res.status(404).json({
            response: "Error",
            message: "Out of stock",
            in_stock: product.stock,
            you_have_in_cart: cart.products[existingProductIndex].quantity,
          });

        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }
      await cart.save();
      res.status(200).json({ result: "Success", message: "Product added to cart" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await cartRepository.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });

      const product = await productRepository.getById(pid);
      if (!product)
        return res.status(404).json({ response: "Error", message: "Product not found" });

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.product._id.toString() === pid.toString()
      );

      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
      } else {
        return res.status(404).send({ result: "Error", message: "Product not found in cart" });
      }
      await cart.save();
      res.status(200).json({ result: "Success", message: "Product deleted from cart" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async updateCart(req, res) {
    const { cid } = req.params;
    const products = req.body.products;

    try {
      const cart = await cartRepository.getById(cid);

      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });

      if (!Array.isArray(products))
        return res.status(400).json({ response: "Error", message: "Products must be an array" });

      for (const item of products) {
        const productId = item.product;
        const quantity = item.quantity;

        // Search the product in the database
        const product = await productRepository.getById(productId);

        if (!product) {
          return res.status(404).json({
            response: "Error",
            message: `Product with id ${productId} not found`,
          });
        }

        // Update cart with product and quantity
        const existingProductIndex = cart.products.findIndex(
          (prod) => prod.product._id.toString() === productId.toString()
        );

        if (existingProductIndex !== -1) {
          // If the product already exists in the cart, update the quantity
          cart.products[existingProductIndex].quantity = quantity;
        } else {
          // If the product does not exist in the cart, add it
          cart.products.push({ product: productId, quantity: quantity });
        }
      }
      await cart.save();
      res.status(200).json({ result: "Success", message: "Cart updated" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async updateQuantity(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await cartRepository.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });

      const product = await productRepository.getById(pid);
      if (!product)
        return res.status(404).json({ response: "Error", message: "Product not found" });

      //Stock control
      if (quantity > product.stock)
        return res.status(404).json({
          response: "Error",
          message: "Out of stock",
          in_stock: product.stock,
        });

      if (quantity < 1)
        return res
          .status(404)
          .json({ response: "Error", message: "Quantity cannot be less than 1" });

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.product._id.toString() === pid.toString()
      );
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = quantity;
      } else {
        return res.status(404).json({ response: "Error", message: "Product not found in cart" });
      }
      await cart.save();
      res.status(200).json({ message: "The quantity was updated successfully" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async deleteAll(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartRepository.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });
      cart.products = [];
      await cart.save();
      res.status(200).json({ result: "Success", message: "All products deleted from cart" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async deleteAllCarts(req, res) {
    try {
      await cartRepository.delete();
      res.status(200).json({ result: "Success", message: "All carts deleted" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async purchase(req, res) {
    const { cid } = req.params;

    try {
      const cart = await cartRepository.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });

      if (cart.products.length === 0)
        return res.status(400).json({ response: "Error", message: "Cart is empty" });

      const productsWithoutStock = [];

      cart.products.forEach((p) => {
        if (p.product?.stock < p.quantity) {
          productsWithoutStock.push({
            productId: p.product._id,
            productName: p.product.name,
            quantity: p.quantity,
            stock: p.product.stock,
          });
        }
      });

      if (productsWithoutStock.length > 0) {
        return res.status(400).json({
          error: "Insufficient stock",
          details: productsWithoutStock,
        });
      }

      const promises = cart.products.map((p) =>
        productRepository.discountStock(p.product._id, p.quantity)
      );

      await Promise.all(promises);

      const amount = cart.products.reduce(
        (acc, curr) => acc + curr.quantity * curr.product.price,
        0
      );

      const productDetails = cart.products.map((p) => ({
        name: p.product.title,
        quantity: p.quantity,
        price: p.product.price,
      }));

      //Ticket
      const ticket = await ticketRepository.create({
        code: uuidv4(),
        purchase_datatime: new Date(),
        amount,
        purchaser: req.user._id,
        products: cart.products.map((p) => ({ product: p.product._id, quantity: p.quantity })),
      });

      cart.products = [];
      await cart.save();

      //Send Email
      await mailService.sendMail({
        name: `${req.user.first_name} ${req.user.last_name}`,
        to: req.user.email,
        subject: "Compra recibida",
        type: "buy",
        amount,
        products: productDetails,
      });

      res.status(200).json({ message: "Buy success", ticket });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }
}

export const cartController = new CartController();
