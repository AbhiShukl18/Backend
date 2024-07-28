import { Router } from "express";
import {
  CreateNewProduct,
  GetAllProducts,
  GetSingleProducts,
} from "../Controllers/product.controllers.js";
import { checkIsAdminValid } from "../middleware/all.middleware.js";
 
const router = Router();

router.get("/get-all-product", GetAllProducts);
router.post("/get-single-product", GetSingleProducts);
router.post("/create-new-product", checkIsAdminValid, CreateNewProduct);

export default router;