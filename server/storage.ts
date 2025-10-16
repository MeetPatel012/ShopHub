import {
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import { randomUUID } from "crypto";

// Product images served from online sources
const productImages = {
  headphones: {
    main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&crop=center",
    ],
  },
  watch: {
    main: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop&crop=center",
    ],
  },
  smartphone: {
    main: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&crop=center",
    ],
  },
  bag: {
    main: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1601925260369-2b0a0b2b5b1e?w=400&h=400&fit=crop&crop=center",
    ],
  },
  mug: {
    main: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    ],
  },
  lamp: {
    main: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    ],
  },
  shoes: {
    main: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    ],
  },
  sunglasses: {
    main: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
    ],
  },
  backpack: {
    main: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1601925260369-2b0a0b2b5b1e?w=400&h=400&fit=crop&crop=center",
    ],
  },
};

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const mockProducts: InsertProduct[] = [
      {
        name: "Premium Wireless Headphones",
        description:
          "Experience crystal-clear audio with active noise cancellation and 30-hour battery life. Premium comfort for all-day wear.",
        price: "299.99",
        originalPrice: "399.99",
        category: "electronics",
        image: productImages.headphones.main,
        images: productImages.headphones.gallery,
        inStock: true,
        rating: "4.8",
        reviewCount: 324,
        specifications:
          "Bluetooth 5.0, Active Noise Cancellation, 30-hour battery, Premium leather ear cups",
        featured: true,
      },
      {
        name: "Classic Leather Watch",
        description:
          "Timeless elegance meets precision engineering. Swiss-made automatic movement with genuine leather strap.",
        price: "459.00",
        originalPrice: "599.00",
        category: "fashion",
        image: productImages.watch.main,
        images: productImages.watch.gallery,
        inStock: true,
        rating: "4.9",
        reviewCount: 156,
        specifications:
          "Swiss automatic movement, Sapphire crystal, Water resistant 50m, Genuine leather strap",
        featured: true,
      },
      {
        name: "Midnight Blue Smartphone",
        description:
          "Flagship performance with stunning OLED display and professional-grade camera system. The ultimate mobile experience.",
        price: "899.99",
        originalPrice: "1099.99",
        category: "electronics",
        image: productImages.smartphone.main,
        images: productImages.smartphone.gallery,
        inStock: true,
        rating: "4.7",
        reviewCount: 892,
        specifications:
          "6.5-inch OLED display, Triple camera system, 5G connectivity, 128GB storage",
        featured: true,
      },
      {
        name: "Premium Leather Laptop Bag",
        description:
          "Handcrafted Italian leather with premium hardware. Perfect for professionals who demand quality and style.",
        price: "189.99",
        category: "accessories",
        image: productImages.bag.main,
        images: productImages.bag.gallery,
        inStock: true,
        rating: "4.6",
        reviewCount: 234,
        specifications:
          "Genuine Italian leather, Fits 15-inch laptops, Multiple compartments, YKK zippers",
        featured: true,
      },
      {
        name: "Minimalist Ceramic Mug",
        description:
          "Artisan-crafted ceramic mug with perfect ergonomics. Microwave and dishwasher safe.",
        price: "24.99",
        category: "lifestyle",
        image: productImages.mug.main,
        images: productImages.mug.gallery,
        inStock: true,
        rating: "4.5",
        reviewCount: 567,
        specifications:
          "12oz capacity, Food-safe glaze, Microwave safe, Dishwasher safe",
        featured: false,
      },
      {
        name: "Modern LED Desk Lamp",
        description:
          "Adjustable brightness with multiple color temperatures. Perfect for work and relaxation.",
        price: "79.99",
        originalPrice: "99.99",
        category: "lifestyle",
        image: productImages.lamp.main,
        images: productImages.lamp.gallery,
        inStock: true,
        rating: "4.7",
        reviewCount: 423,
        specifications:
          "Dimmable LED, 5 color temperatures, Touch controls, USB charging port",
        featured: false,
      },
      {
        name: "Performance Running Shoes",
        description:
          "Engineered for speed and comfort. Responsive cushioning meets breathable design.",
        price: "149.99",
        category: "fashion",
        image: productImages.shoes.main,
        images: productImages.shoes.gallery,
        inStock: true,
        rating: "4.8",
        reviewCount: 678,
        specifications:
          "Breathable mesh upper, Responsive foam, Carbon fiber plate, Reflective details",
        featured: false,
      },
      {
        name: "Aviator Sunglasses",
        description:
          "Classic design with polarized lenses. UV400 protection and premium metal frame.",
        price: "129.00",
        originalPrice: "179.00",
        category: "accessories",
        image: productImages.sunglasses.main,
        images: productImages.sunglasses.gallery,
        inStock: true,
        rating: "4.6",
        reviewCount: 289,
        specifications:
          "Polarized lenses, UV400 protection, Metal frame, Includes case and cloth",
        featured: false,
      },
      {
        name: "Modern Travel Backpack",
        description:
          "Water-resistant design with laptop compartment. Perfect for urban explorers and digital nomads.",
        price: "99.99",
        category: "accessories",
        image: productImages.backpack.main,
        images: productImages.backpack.gallery,
        inStock: true,
        rating: "4.7",
        reviewCount: 512,
        specifications:
          "Water-resistant fabric, Laptop compartment (15-inch), USB charging port, Anti-theft pocket",
        featured: false,
      },
    ];

    mockProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, {
        ...product,
        id,
        originalPrice: product.originalPrice || null,
        rating: product.rating || null,
        reviewCount: product.reviewCount || null,
        specifications: product.specifications || null,
        featured: product.featured || false,
        inStock: product.inStock !== undefined ? product.inStock : true,
      });
    });
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      (item) =>
        item.productId === insertItem.productId &&
        item.sessionId === insertItem.sessionId
    );

    if (existing) {
      existing.quantity += insertItem.quantity || 1;
      this.cartItems.set(existing.id, existing);
      return existing;
    }

    const id = randomUUID();
    const cartItem: CartItem = {
      ...insertItem,
      id,
      quantity: insertItem.quantity || 1,
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(
    id: string,
    quantity: number
  ): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = await this.getCartItems(sessionId);
    items.forEach((item) => this.cartItems.delete(item.id));
    return true;
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      status: "completed",
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
