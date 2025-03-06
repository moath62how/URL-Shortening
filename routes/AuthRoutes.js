import { Router } from "express";
import { login, signUp, logout } from "../controllers/AuthController.js";

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/logout").post(logout);
export default router;
