import { Router } from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart
} from "../controllers/cartController";
import { protect } from "../middleware/auth";

const router = Router();

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.patch("/", updateQuantity);
router.delete("/:productId", removeItem);
router.delete("/", clearCart);

export default router;
