import { Router } from "express";
import { LoginAdmin } from "../Controllers/admin.controllers.js";

const router = Router();

router.post("/login-admin", LoginAdmin);

export default router;