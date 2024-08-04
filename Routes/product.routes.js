import { Router } from "express";
import {
  CreateNewProduct,
  filter,
  agPipeline,
  GetAllProducts,
  GetSingleProducts,
} from "../Controllers/product.controllers.js";
import { checkIsAdminValid } from "../middleware/all.middleware.js";
 
const router = Router();

router.get("/get-all-product", GetAllProducts);
router.post("/get-single-product", GetSingleProducts);
router.post("/create-new-product", checkIsAdminValid, CreateNewProduct);
router.post('/filter',filter)
router.post('/aggreration-pipeline',agPipeline)


export default router;