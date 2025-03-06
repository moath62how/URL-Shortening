import { Router } from "express";
import {
  createUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, permitOnly } from "../controllers/AuthController.js";
const router = Router();

router.use(protect);
router.use(permitOnly("admin"));
router.route("/").post(createUser).get(getAllUser);
router.route("/:id").delete(deleteUser).get(getUser).patch(updateUser);
export default router;
