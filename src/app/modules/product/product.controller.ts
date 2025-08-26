import type { Request, Response } from "express";
import * as ProductService from "./product.service";

export default {
  async createProduct(req: Request, res: Response) {
    console.log("body : ", req.body);
    console.log("file : ", req.file);
    const data = await ProductService.createProduct(req.body, req.file);
    res.status(201).json(data);
  },

  async getProducts(req: Request, res: Response) {
    const data = await ProductService.getProducts();
    res.json(data);
  },

  async getProductById(req: Request, res: Response) {
    const data = await ProductService.getProductById(req.params.id!);
    if (!data) return res.status(404).json({ message: "Product not found" });
    res.json(data);
  },

  async updateProduct(req: Request, res: Response) {
    const data = await ProductService.updateProduct(req.params.id!, req.body, req.file);
    res.json(data);
  },

  async deleteProduct(req: Request, res: Response) {
    await ProductService.deleteProduct(req.params.id!);
    res.status(204).send();
  },
};
