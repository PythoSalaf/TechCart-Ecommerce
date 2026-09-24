import { Router } from "express";
import {
  createProduct,
  getAllCustormers,
  getAllOrders,
  getAllProducts,
  getDashboardStats,
  updateOrderStatus,
  updateProduct,
} from "../controllers/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.use(protectRoute, adminOnly);

router.post("/products", upload.array("images", 5), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", upload.array("images", 5), updateProduct);

router.get("/orders", getAllOrders);
router.patch("/order/:orderId/status", updateOrderStatus);
router.get("/custormers", getAllCustormers);
router.get("/stats", getDashboardStats);

// DIFFERENT BETWEEN PUT AND PATCH
// PUT: when you're updating the whole resource: Updating the entire resource
// PATCH: When you're updating the resource partially: Updating a specific part of the resource!

export default router;
