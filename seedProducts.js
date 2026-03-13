import mongoose from "mongoose";
import { ProductModel } from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    price: 119999,
    category: "Mobiles",
    stock: 50,
    image: "https://picsum.photos/400/400?random=1",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    brand: "Apple",
    rating: 4.5,
    numReviews: 12
  },
  {
    name: "Samsung Galaxy S24",
    price: 89999,
    category: "Mobiles",
    stock: 30,
    image: "https://picsum.photos/400/400?random=2",
    description: "Flagship Android phone with Galaxy AI and premium features",
    brand: "Samsung",
    rating: 4.3,
    numReviews: 8
  },
  {
    name: "MacBook Air M2",
    price: 99999,
    category: "Electronics",
    stock: 20,
    image: "https://picsum.photos/400/400?random=3",
    description: "Ultra-thin laptop with M2 chip and all-day battery life",
    brand: "Apple",
    rating: 4.7,
    numReviews: 15
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 29999,
    category: "Electronics",
    stock: 40,
    image: "https://picsum.photos/400/400?random=4",
    description: "Premium noise-canceling headphones with exceptional sound quality",
    brand: "Sony",
    rating: 4.6,
    numReviews: 20
  },
  {
    name: "Nike Air Max 270",
    price: 12999,
    category: "Shoes",
    stock: 60,
    image: "https://picsum.photos/400/400?random=5",
    description: "Comfortable running shoes with Max Air unit",
    brand: "Nike",
    rating: 4.2,
    numReviews: 18
  },
  {
    name: "Adidas Ultraboost 22",
    price: 15999,
    category: "Shoes",
    stock: 45,
    image: "https://picsum.photos/400/400?random=6",
    description: "Responsive running shoes with Boost cushioning",
    brand: "Adidas",
    rating: 4.4,
    numReviews: 10
  },
  {
    name: "Levi's 501 Jeans",
    price: 4999,
    category: "Fashion",
    stock: 80,
    image: "https://picsum.photos/400/400?random=7",
    description: "Classic straight-fit jeans in original denim",
    brand: "Levi's",
    rating: 4.1,
    numReviews: 25
  },
  {
    name: "Polo T-Shirt",
    price: 1999,
    category: "Fashion",
    stock: 100,
    image: "https://picsum.photos/400/400?random=8",
    description: "Premium cotton polo shirt with classic fit",
    brand: "Polo",
    rating: 3.9,
    numReviews: 14
  },
  {
    name: "iPad Pro 12.9",
    price: 89999,
    category: "Electronics",
    stock: 25,
    image: "https://picsum.photos/400/400?random=9",
    description: "Professional tablet with M2 chip and Liquid Retina XDR display",
    brand: "Apple",
    rating: 4.8,
    numReviews: 9
  },
  {
    name: "OnePlus 12",
    price: 64999,
    category: "Mobiles",
    stock: 35,
    image: "https://picsum.photos/400/400?random=10",
    description: "Flagship killer with Hasselblad camera system",
    brand: "OnePlus",
    rating: 4.3,
    numReviews: 11
  },
  {
    name: "Puma Sneakers",
    price: 8999,
    category: "Shoes",
    stock: 70,
    image: "https://picsum.photos/400/400?random=11",
    description: "Stylish casual sneakers for everyday wear",
    brand: "Puma",
    rating: 4.0,
    numReviews: 16
  },
  {
    name: "Hoodie Jacket",
    price: 2999,
    category: "Fashion",
    stock: 55,
    image: "https://picsum.photos/400/400?random=12",
    description: "Comfortable hoodie with kangaroo pocket",
    brand: "Generic",
    rating: 3.8,
    numReviews: 7
  },
  {
    name: "Google Pixel 8 Pro",
    price: 79999,
    category: "Mobiles",
    stock: 25,
    image: "https://picsum.photos/400/400?random=13",
    description: "Google's flagship smartphone with advanced AI features and Tensor G3 chip",
    brand: "Google",
    rating: 4.4,
    numReviews: 6
  },
  {
    name: "Dell XPS 13 Laptop",
    price: 109999,
    category: "Electronics",
    stock: 15,
    image: "https://picsum.photos/400/400?random=14",
    description: "Ultra-portable laptop with Intel Core i7 and stunning display",
    brand: "Dell",
    rating: 4.2,
    numReviews: 8
  },
  {
    name: "Apple Watch Series 9",
    price: 44999,
    category: "Electronics",
    stock: 35,
    image: "https://picsum.photos/400/400?random=15",
    description: "Advanced health and fitness tracking with beautiful design",
    brand: "Apple",
    rating: 4.6,
    numReviews: 12
  },
  {
    name: "Reebok Classic Shoes",
    price: 7999,
    category: "Shoes",
    stock: 50,
    image: "https://picsum.photos/400/400?random=16",
    description: "Classic lifestyle shoes with timeless style",
    brand: "Reebok",
    rating: 3.9,
    numReviews: 9
  },
  {
    name: "Woodland Boots",
    price: 6999,
    category: "Shoes",
    stock: 40,
    image: "https://picsum.photos/400/400?random=17",
    description: "Rugged outdoor boots for all terrains",
    brand: "Woodland",
    rating: 4.1,
    numReviews: 7
  },
  {
    name: "Tommy Hilfiger Shirt",
    price: 3499,
    category: "Fashion",
    stock: 60,
    image: "https://picsum.photos/400/400?random=18",
    description: "Classic American style shirt with premium cotton",
    brand: "Tommy Hilfiger",
    rating: 4.0,
    numReviews: 11
  },
  {
    name: "Zara Denim Jacket",
    price: 5999,
    category: "Fashion",
    stock: 45,
    image: "https://picsum.photos/400/400?random=19",
    description: "Modern denim jacket with contemporary fit",
    brand: "Zara",
    rating: 3.7,
    numReviews: 8
  },
  {
    name: "Canon EOS R6 Camera",
    price: 159999,
    category: "Electronics",
    stock: 10,
    image: "https://picsum.photos/400/400?random=20",
    description: "Professional mirrorless camera with 4K video recording",
    brand: "Canon",
    rating: 4.8,
    numReviews: 5
  },
  {
    name: "Xiaomi Redmi Note 13",
    price: 19999,
    category: "Mobiles",
    stock: 80,
    image: "https://picsum.photos/400/400?random=21",
    description: "Budget-friendly smartphone with impressive features",
    brand: "Xiaomi",
    rating: 3.8,
    numReviews: 14
  },
  {
    name: "Sony PlayStation 5",
    price: 49999,
    category: "Electronics",
    stock: 30,
    image: "https://picsum.photos/400/400?random=22",
    description: "Next-generation gaming console with stunning graphics",
    brand: "Sony",
    rating: 4.7,
    numReviews: 18
  },
  {
    name: "JBL Speaker System",
    price: 12999,
    category: "Electronics",
    stock: 25,
    image: "https://picsum.photos/400/400?random=23",
    description: "Powerful Bluetooth speaker with deep bass",
    brand: "JBL",
    rating: 4.3,
    numReviews: 10
  },
  {
    name: "Crocs Sandals",
    price: 2999,
    category: "Shoes",
    stock: 90,
    image: "https://picsum.photos/400/400?random=24",
    description: "Comfortable and lightweight footwear for casual wear",
    brand: "Crocs",
    rating: 3.6,
    numReviews: 12
  },
  {
    name: "H&M Summer Dress",
    price: 2499,
    category: "Fashion",
    stock: 70,
    image: "https://picsum.photos/400/400?random=25",
    description: "Stylish summer dress perfect for warm weather",
    brand: "H&M",
    rating: 3.9,
    numReviews: 9
  },
  {
    name: "Ray-Ban Aviator Sunglasses",
    price: 8999,
    category: "Fashion",
    stock: 40,
    image: "https://picsum.photos/400/400?random=26",
    description: "Iconic aviator style sunglasses with UV protection",
    brand: "Ray-Ban",
    rating: 4.5,
    numReviews: 13
  },
  {
    name: "OPPO Find X6",
    price: 44999,
    category: "Mobiles",
    stock: 45,
    image: "https://picsum.photos/400/400?random=27",
    description: "Premium smartphone with advanced camera system and fast charging",
    brand: "OPPO",
    rating: 4.2,
    numReviews: 8
  },
  {
    name: "Vivo X100",
    price: 39999,
    category: "Mobiles",
    stock: 60,
    image: "https://picsum.photos/400/400?random=28",
    description: "Mid-range smartphone with excellent camera and battery life",
    brand: "Vivo",
    rating: 4.0,
    numReviews: 9
  },
  {
    name: "HP Spectre x360",
    price: 89999,
    category: "Electronics",
    stock: 18,
    image: "https://picsum.photos/400/400?random=29",
    description: "Convertible laptop with touchscreen and premium build",
    brand: "HP",
    rating: 4.1,
    numReviews: 7
  },
  {
    name: "Lenovo ThinkPad X1",
    price: 129999,
    category: "Electronics",
    stock: 12,
    image: "https://picsum.photos/400/400?random=30",
    description: "Business laptop with legendary durability and performance",
    brand: "Lenovo",
    rating: 4.4,
    numReviews: 11
  },
  {
    name: "ASUS ROG Gaming Laptop",
    price: 139999,
    category: "Electronics",
    stock: 8,
    image: "https://picsum.photos/400/400?random=31",
    description: "High-performance gaming laptop with RGB keyboard",
    brand: "ASUS",
    rating: 4.6,
    numReviews: 14
  },
  {
    name: "Bose QuietComfort Headphones",
    price: 24999,
    category: "Electronics",
    stock: 35,
    image: "https://picsum.photos/400/400?random=32",
    description: "Premium noise-canceling headphones with superior comfort",
    brand: "Bose",
    rating: 4.5,
    numReviews: 16
  },
  {
    name: "Fitbit Charge 6",
    price: 9999,
    category: "Electronics",
    stock: 50,
    image: "https://picsum.photos/400/400?random=33",
    description: "Advanced fitness tracker with health monitoring",
    brand: "Fitbit",
    rating: 4.0,
    numReviews: 12
  },
  {
    name: "New Balance 990v5",
    price: 10999,
    category: "Shoes",
    stock: 55,
    image: "https://picsum.photos/400/400?random=34",
    description: "Classic running shoes with modern comfort technology",
    brand: "New Balance",
    rating: 4.3,
    numReviews: 15
  },
  {
    name: "Skechers Go Walk",
    price: 4999,
    category: "Shoes",
    stock: 75,
    image: "https://picsum.photos/400/400?random=35",
    description: "Comfortable walking shoes with memory foam",
    brand: "Skechers",
    rating: 3.9,
    numReviews: 18
  },
  {
    name: "Bata Formal Shoes",
    price: 3999,
    category: "Shoes",
    stock: 65,
    image: "https://picsum.photos/400/400?random=36",
    description: "Elegant formal shoes for office wear",
    brand: "Bata",
    rating: 3.7,
    numReviews: 9
  },
  {
    name: "Allen Solly Trousers",
    price: 4499,
    category: "Fashion",
    stock: 40,
    image: "https://picsum.photos/400/400?random=37",
    description: "Premium formal trousers with perfect fit",
    brand: "Allen Solly",
    rating: 4.1,
    numReviews: 6
  },
  {
    name: "Arrow Formal Shirt",
    price: 2999,
    category: "Fashion",
    stock: 85,
    image: "https://picsum.photos/400/400?random=38",
    description: "Classic formal shirt for business meetings",
    brand: "Arrow",
    rating: 3.8,
    numReviews: 10
  },
  {
    name: "Van Heusen Blazer",
    price: 6999,
    category: "Fashion",
    stock: 30,
    image: "https://picsum.photos/400/400?random=39",
    description: "Professional blazer for formal occasions",
    brand: "Van Heusen",
    rating: 4.2,
    numReviews: 7
  },
  {
    name: "Microsoft Surface Pro 9",
    price: 99999,
    category: "Electronics",
    stock: 20,
    image: "https://picsum.photos/400/400?random=40",
    description: "Versatile 2-in-1 tablet with laptop performance",
    brand: "Microsoft",
    rating: 4.3,
    numReviews: 8
  },
  {
    name: "Nintendo Switch OLED",
    price: 34999,
    category: "Electronics",
    stock: 40,
    image: "https://picsum.photos/400/400?random=41",
    description: "Hybrid gaming console with vibrant OLED screen",
    brand: "Nintendo",
    rating: 4.7,
    numReviews: 22
  },
  {
    name: "LG OLED TV 55 inch",
    price: 89999,
    category: "Electronics",
    stock: 15,
    image: "https://picsum.photos/400/400?random=42",
    description: "Premium OLED TV with stunning picture quality",
    brand: "LG",
    rating: 4.5,
    numReviews: 13
  },
  {
    name: "Philips Air Fryer",
    price: 7999,
    category: "Electronics",
    stock: 25,
    image: "https://picsum.photos/400/400?random=43",
    description: "Healthy cooking with advanced air frying technology",
    brand: "Philips",
    rating: 4.0,
    numReviews: 11
  },
  {
    name: "Campus Shoes",
    price: 2999,
    category: "Shoes",
    stock: 95,
    image: "https://picsum.photos/400/400?random=44",
    description: "Affordable and comfortable casual shoes",
    brand: "Campus",
    rating: 3.6,
    numReviews: 14
  },
  {
    name: "Liberty Shoes",
    price: 5999,
    category: "Shoes",
    stock: 50,
    image: "https://picsum.photos/400/400?random=45",
    description: "Stylish shoes for modern lifestyle",
    brand: "Liberty",
    rating: 3.8,
    numReviews: 9
  },
  {
    name: "Peter England Shirts",
    price: 3499,
    category: "Fashion",
    stock: 70,
    image: "https://picsum.photos/400/400?random=46",
    description: "Contemporary shirts with perfect fit",
    brand: "Peter England",
    rating: 4.0,
    numReviews: 12
  },
  {
    name: "Louis Philippe T-Shirts",
    price: 2499,
    category: "Fashion",
    stock: 80,
    image: "https://picsum.photos/400/400?random=47",
    description: "Premium cotton t-shirts for casual wear",
    brand: "Louis Philippe",
    rating: 3.9,
    numReviews: 8
  },
  {
    name: "InFocus Projector",
    price: 44999,
    category: "Electronics",
    stock: 12,
    image: "https://picsum.photos/400/400?random=48",
    description: "Professional projector for presentations",
    brand: "InFocus",
    rating: 4.1,
    numReviews: 5
  },
  {
    name: "JBL Party Speaker",
    price: 18999,
    category: "Electronics",
    stock: 18,
    image: "https://picsum.photos/400/400?random=49",
    description: "Powerful speaker for parties and events",
    brand: "JBL",
    rating: 4.4,
    numReviews: 7
  },
  {
    name: "Realme GT 5G",
    price: 25999,
    category: "Mobiles",
    stock: 70,
    image: "https://picsum.photos/400/400?random=50",
    description: "5G smartphone with gaming features",
    brand: "Realme",
    rating: 3.9,
    numReviews: 10
  },
  {
    name: "Motorola Edge 40",
    price: 22999,
    category: "Mobiles",
    stock: 55,
    image: "https://picsum.photos/400/400?random=51",
    description: "Mid-range phone with edge display",
    brand: "Motorola",
    rating: 3.8,
    numReviews: 9
  },
  {
    name: "Redmi Note 12",
    price: 17999,
    category: "Mobiles",
    stock: 90,
    image: "https://picsum.photos/400/400?random=52",
    description: "Budget smartphone with impressive features",
    brand: "Redmi",
    rating: 3.7,
    numReviews: 13
  },
  {
    name: "Wildcraft Casual Shoes",
    price: 3499,
    category: "Shoes",
    stock: 85,
    image: "https://picsum.photos/400/400?random=53",
    description: "Trendy casual shoes for youth",
    brand: "Wildcraft",
    rating: 3.6,
    numReviews: 11
  },
  {
    name: "U.S. Polo Assn Jeans",
    price: 4499,
    category: "Fashion",
    stock: 60,
    image: "https://picsum.photos/400/400?random=54",
    description: "Classic American style jeans",
    brand: "U.S. Polo Assn",
    rating: 3.9,
    numReviews: 8
  },
  {
    name: "John Players Shirts",
    price: 2999,
    category: "Fashion",
    stock: 75,
    image: "https://picsum.photos/400/400?random=55",
    description: "Casual shirts with modern designs",
    brand: "John Players",
    rating: 3.7,
    numReviews: 10
  },
  {
    name: "Samsung Galaxy Watch 6",
    price: 24999,
    category: "Electronics",
    stock: 30,
    image: "https://picsum.photos/400/400?random=56",
    description: "Smartwatch with health and fitness tracking",
    brand: "Samsung",
    rating: 4.2,
    numReviews: 9
  },
  {
    name: "Boat Rockerz Speakers",
    price: 3999,
    category: "Electronics",
    stock: 100,
    image: "https://picsum.photos/400/400?random=57",
    description: "Affordable speakers with powerful bass",
    brand: "Boat",
    rating: 3.8,
    numReviews: 15
  },
  {
    name: "Mi Smart Band",
    price: 2999,
    category: "Electronics",
    stock: 120,
    image: "https://picsum.photos/400/400?random=58",
    description: "Budget fitness tracker with essential features",
    brand: "Mi",
    rating: 3.5,
    numReviews: 12
  },
  {
    name: "Red Chief Shoes",
    price: 4999,
    category: "Shoes",
    stock: 65,
    image: "https://picsum.photos/400/400?random=59",
    description: "Durable shoes for outdoor activities",
    brand: "Red Chief",
    rating: 3.7,
    numReviews: 8
  },
  {
    name: "Wrangler Jeans",
    price: 5999,
    category: "Fashion",
    stock: 45,
    image: "https://picsum.photos/400/400?random=60",
    description: "Rugged jeans for adventurous lifestyle",
    brand: "Wrangler",
    rating: 4.0,
    numReviews: 11
  },
  {
    name: "Lee Cooper Jeans",
    price: 3999,
    category: "Fashion",
    stock: 80,
    image: "https://picsum.photos/400/400?random=61",
    description: "Classic fit jeans with comfort",
    brand: "Lee Cooper",
    rating: 3.8,
    numReviews: 9
  },
  {
    name: "Sony WH-CH720N Headphones",
    price: 14999,
    category: "Electronics",
    stock: 40,
    image: "https://picsum.photos/400/400?random=62",
    description: "Wireless headphones with long battery life",
    brand: "Sony",
    rating: 4.1,
    numReviews: 7
  },
  {
    name: "Logitech MX Master Mouse",
    price: 8999,
    category: "Electronics",
    stock: 60,
    image: "https://picsum.photos/400/400?random=63",
    description: "Advanced wireless mouse for productivity",
    brand: "Logitech",
    rating: 4.4,
    numReviews: 14
  },
  {
    name: "Xiaomi Smart TV 43 inch",
    price: 24999,
    category: "Electronics",
    stock: 25,
    image: "https://picsum.photos/400/400?random=64",
    description: "Smart TV with Android TV and voice control",
    brand: "Xiaomi",
    rating: 4.0,
    numReviews: 8
  },
  {
    name: "OnePlus Nord CE 3",
    price: 19999,
    category: "Mobiles",
    stock: 80,
    image: "https://picsum.photos/400/400?random=65",
    description: "Affordable 5G smartphone with fast charging",
    brand: "OnePlus",
    rating: 3.9,
    numReviews: 12
  },
  {
    name: "Lava Agni 3",
    price: 11999,
    category: "Mobiles",
    stock: 100,
    image: "https://picsum.photos/400/400?random=66",
    description: "Budget smartphone with essential features",
    brand: "Lava",
    rating: 3.4,
    numReviews: 6
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "clickcart",
    });

    console.log("Connected to MongoDB");

    // Clear existing products
    await ProductModel.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    await ProductModel.insertMany(sampleProducts);
    console.log("Sample products added successfully");

    console.log(`Added ${sampleProducts.length} products to the database`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
