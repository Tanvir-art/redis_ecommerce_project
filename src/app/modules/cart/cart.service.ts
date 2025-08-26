import { Cart, type ICart } from "./cart.model";

export const addToCart = async (payload: ICart) => {
  const existing = await Cart.findOne({
    user: payload.user,
    product: payload.product,
  });

  if (existing) {
    existing.quantity += payload.quantity;
    return existing.save();
  }

  return Cart.create(payload);
};

export const getCart = async (userId: string) => {
  return Cart.find({ user: userId }).populate("product");
};

export const updateCart = async (id: string, quantity: number) => {
  return Cart.findByIdAndUpdate(id, { quantity }, { new: true });
};

export const removeFromCart = async (id: string) => {
  return Cart.findByIdAndDelete(id);
};
