import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createProduct", verifyToken, createProduct);
router.get("/getAllProduct", verifyToken, getAllProducts);
router.get("/getSingleProduct/:id", verifyToken, getProductById);
router.patch("/updateSingleProduct/:id", verifyToken, updateProduct);
router.delete("/deleteProduct/:id", verifyToken, deleteProduct);

export default router;