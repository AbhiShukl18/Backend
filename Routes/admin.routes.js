import { Router } from "express";
import { AdminLogin, RegisterAdmin, getCurrentAdmin, logoutAdmin  } from "../Controllers/admin.controllers.js";

const router = Router();

router.post("/login-admin", AdminLogin);
router.post("/register-admin", RegisterAdmin);
router.get('/get-current-admin', getCurrentAdmin)
router.get('/logout', logoutAdmin)


export default router;