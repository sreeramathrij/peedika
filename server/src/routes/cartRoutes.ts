import { Router } from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart
} from "../controllers/cartController";
import { getGreenerCart, swapCartItem } from "../controllers/greenerCartController";
import { protect } from "../middleware/auth";

const router = Router();

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.patch("/", updateQuantity);
router.delete("/:productId", removeItem);
router.delete("/", clearCart);

router.get("/greener", protect, getGreenerCart);
router.post("/swap", swapCartItem);

export default router;
