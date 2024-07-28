import { Router } from "express";
import {
  AddToCart,
  GetAllCartProducts,
} from "../Controllers/user.controllers.js";
import { checkIsUserValid } from "../middleware/all.middleware.js";

const router = Router();

router.get("/get-all-cart-product", checkIsUserValid ,GetAllCartProducts);
router.post("/add-to-cart", checkIsUserValid, AddToCart);

export default router;