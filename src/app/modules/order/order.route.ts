import express from "express";
import OrderController from "./order.controller";

const router = express.Router();

router.post("/:userId", OrderController.placeOrder);
router.get("/:userId", OrderController.getOrders);

export const orderRouter = router;
