import { Router } from "express";
import userRoutes from "./user.routes.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./product.routes.js";
import authRoutes from "./auth.routes.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { autorization } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/user", passportCall("jwt"), autorization(["admin"]), userRoutes);
router.use("/cart", passportCall("jwt"), cartRoutes);
router.use("/product", productRoutes);
router.use("/auth", authRoutes);

export default router;
