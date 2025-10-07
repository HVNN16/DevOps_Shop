import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

// ✅ load .env từ thư mục backend
dotenv.config({ path: './.env' });

const uri = process.env.MONGO_URI; // đúng với tên trong .env

async function run() {
  if (!uri) {
    console.error("❌ MONGO_URI not found! Check your .env file path and variable name.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  await Product.deleteMany({});

  const sampleProducts = [
    {
      name: 'iPhone 15',
      slug: 'iphone-15',
      brand: 'Apple',
      model: '15',
      basePrice: 22000000,
      discountPercent: 5,
      specs: { screen: '6.1 OLED 60Hz', chipset: 'A16', os: 'iOS 17' },
      variants: [
        { color: 'Black', storage: '128GB', ram: '6GB', price: 21990000, stock: 30 },
        { color: 'Blue', storage: '256GB', ram: '6GB', price: 23990000, stock: 20 },
      ]
    },
    {
      name: 'Galaxy S24',
      slug: 'galaxy-s24',
      brand: 'Samsung',
      model: 'S24',
      basePrice: 19990000,
      discountPercent: 10,
      specs: { screen: '6.2" AMOLED 120Hz', chipset: 'Snapdragon 8 Gen 3', os: 'Android 14' },
      variants: [
        { color: 'Gray', storage: '256GB', ram: '8GB', price: 18990000, stock: 15 },
      ]
    }
  ];
  for (const p of sampleProducts) {
  const prod = new Product(p);
  await prod.save();
  }

  console.log('✅ Seeded sample products successfully!');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌ Error seeding data:', err);
  process.exit(1);
});
