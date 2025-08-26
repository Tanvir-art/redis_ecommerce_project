import express from "express";
import CartController from "./cart.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.user, USER_ROLE.admin), CartController.addToCart);
router.get("/:userId", auth(USER_ROLE.user, USER_ROLE.admin), CartController.getCart);
router.put("/:id", auth(USER_ROLE.user, USER_ROLE.admin), CartController.updateCart);
router.delete("/:id", auth(USER_ROLE.user, USER_ROLE.admin), CartController.removeFromCart);

export const cartRouter = router;
