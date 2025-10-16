import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertOrderSchema } from "@shared/schema";

// Extend Request type to include sessionID
interface RequestWithSession extends Request {
  sessionID?: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;

      let products;
      if (category && typeof category === "string") {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getAllProducts();
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart", async (req: RequestWithSession, res) => {
    try {
      const sessionId = req.sessionID || "default";
      const cartItems = await storage.getCartItems(sessionId);

      // Populate with product details
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProductById(item.productId);
          return { ...item, product };
        })
      );

      res.json(itemsWithProducts);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req: RequestWithSession, res) => {
    try {
      const sessionId = req.sessionID || "default";
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId,
      });

      const cartItem = await storage.addToCart(validatedData);
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(400).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;

      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ error: "Invalid quantity" });
      }

      if (quantity === 0) {
        await storage.removeFromCart(req.params.id);
        return res.json({ success: true });
      }

      const cartItem = await storage.updateCartItem(req.params.id, quantity);

      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json(cartItem);
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);

      if (!success) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart", async (req: RequestWithSession, res) => {
    try {
      const sessionId = req.sessionID || "default";
      await storage.clearCart(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Orders
  app.post("/api/orders", async (req: RequestWithSession, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);

      // Clear cart after order
      const sessionId = req.sessionID || "default";
      await storage.clearCart(sessionId);

      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(400).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrderById(req.params.id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
