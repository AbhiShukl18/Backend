import { Router } from "express";
import {
  GetAllCartProducts,
} from "../Controllers/user.controllers.js";
import { checkIsUserValid } from "../middleware/all.middleware.js";

const router = Router();

router.get("/get-all-cart-product", checkIsUserValid ,GetAllCartProducts);

export default router;