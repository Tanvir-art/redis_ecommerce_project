import express from "express";
import ProductController from "./product.controller";
import { upload } from "../../config/multer";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), upload.single("image"), ProductController.createProduct);
router.get("/",auth(USER_ROLE.admin), ProductController.getProducts);
router.get("/:id", auth(USER_ROLE.admin), ProductController.getProductById);
router.put("/:id", auth(USER_ROLE.admin), upload.single("image"), ProductController.updateProduct);
router.delete("/:id", auth(USER_ROLE.admin), ProductController.deleteProduct);

export const productRouter = router;
