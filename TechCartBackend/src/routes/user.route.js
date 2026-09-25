import { Router } from "express";
import {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddress,
  getWishlist,
  removeFromWishlist,
  updateAddress,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

// ============================================ ADDRESSES ROUTES ====================================

router.post("/addresses", addAddress);
router.get("/addresses", getAddress);
router.put("addresses/:addressId", updateAddress);
router.delete("addresses/:addressId", deleteAddress);

// ============================================ WISHLIST ROUTES ========================================

router.post("/wishlist", addToWishlist);
router.get("/wishlist", getWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

export default router;
