import { Router } from "express";
import { Login, Register, getCurrentUser, logout} from "../Controllers/auth.controllers.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get('/get-current-user', getCurrentUser)
router.get('/logout', logout)




export default router;