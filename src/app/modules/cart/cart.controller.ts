import type { Request, Response } from "express";
import * as CartService from "./cart.service";

export default {
  async addToCart(req: Request, res: Response) {
    const data = await CartService.addToCart(req.body);
    res.status(201).json({ success: true, data });
  },

  async getCart(req: Request, res: Response) {
    const data = await CartService.getCart(req.params.userId!);
    res.json({ success: true, data });
  },

  async updateCart(req: Request, res: Response) {
    console.log(req.body, req.params.id!);
    const data = await CartService.updateCart(req.params.id!, req.body.quantity);
    res.json({ success: true, data });
  },

  async removeFromCart(req: Request, res: Response) {
    await CartService.removeFromCart(req.params.id!);
    res.json({ success: true, message: "Removed from cart" });
  },
};
