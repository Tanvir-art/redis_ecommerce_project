import type { Request, Response } from "express";
import * as OrderService from "./order.service";

export default {
    async placeOrder(req: Request, res: Response) {
        const data = await OrderService.placeOrder(req.params.userId!);
        res.status(201).json({ success: true, data });
    },

    async getOrders(req: Request, res: Response) {
        const data = await OrderService.getOrders(req.params.userId!);
        res.json({ success: true, data });
    },
};
