import { Product, type IProduct } from "./product.model";
import { redisClient } from "../../config/redis";

// Create Product
export const createProduct = async (payload: IProduct, file?: Express.Multer.File) => {
    console.log(file)
  if (file) payload.image = file.filename as string;

  const product = await Product.create(payload);

  // Invalidate products cache
  await redisClient.del("products");

  return product;
};

// Get all products (with Redis cache)
export const getProducts = async (): Promise<IProduct[]> => {
  const cached = await redisClient.get("products");
  if (cached) return JSON.parse(cached);

  const products = await Product.find();
  await redisClient.setEx("products", 60, JSON.stringify(products)); // cache 60 sec
  return products;
};

// Get single product by ID (with Redis cache)
export const getProductById = async (id: string): Promise<IProduct | null> => {
  const cached = await redisClient.get(`product:${id}`);
  if (cached) return JSON.parse(cached);

  const product = await Product.findById(id);
  if (product) await redisClient.setEx(`product:${id}`, 60, JSON.stringify(product));

  return product;
};

// Update product
export const updateProduct = async (id: string, payload: IProduct, file?: Express.Multer.File) => {
  if (file) payload.image = file.filename;

  const updated = await Product.findByIdAndUpdate(id, payload, { new: true });

  // Invalidate cache
  await redisClient.del("products");
  await redisClient.del(`product:${id}`);

  return updated;
};

// Delete product
export const deleteProduct = async (id: string) => {
  const deleted = await Product.findByIdAndDelete(id);

  // Invalidate cache
  await redisClient.del("products");
  await redisClient.del(`product:${id}`);

  return deleted;
};
