import { Router } from "express";
import { AdminLogin, RegisterAdmin, getCurrentUser, logoutAdmin  } from "../Controllers/admin.controllers.js";

const router = Router();

router.post("/login-admin", AdminLogin);
router.post("/register-admin", RegisterAdmin);
router.get('/get-current-admin', getCurrentUser)
router.get('/logout', logoutAdmin)


export default router;