import { Cart } from "../cart/cart.model";
import { Product } from "../product/product.model";
import { Order } from "./order.model";

 

export const placeOrder = async (userId: string) => {
  const cartItems = await Cart.find({ user: userId }).populate("product");

  if (!cartItems.length) throw new Error("Cart is empty");

  const orderProducts: any[] = [];
  let total = 0;

   for (const item of cartItems) {
  const price = Number((item.product as any).price) * item.quantity; //  Number এ কাস্ট
  total += price;

  orderProducts.push({
    product: item.product._id,
    quantity: item.quantity,
  });

  // stock কমানো (string → number এ কাস্ট করা)
  await Product.findByIdAndUpdate(item.product._id, {
    $inc: { stock: -Number(item.quantity) },  //  Number এ কাস্ট
  });
}


  const order = await Order.create({
    user: userId,
    products: orderProducts,
    total,
  });

  // Cart খালি করে দাও
  await Cart.deleteMany({ user: userId });

  return order;
};

export const getOrders = async (userId: string) => {
  return Order.find({ user: userId }).populate("products.product");
};
