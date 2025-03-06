import { Router } from "express";
import {
  createShorttenedURL,
  getShortenedURL,
  updateShortenedURL,
  deleteShortenedURL,
  getAllShortenedURLs,
} from "../controllers/ShortenedURLController.js";
import { protect, permitOnly } from "../controllers/AuthController.js";

const router = Router();

router.use(protect);
router
  .route("/")
  .get(permitOnly("admin"), getAllShortenedURLs)
  .post(createShorttenedURL);
router.use(permitOnly("admin"));
router
  .route("/:shortCode")
  .get(getShortenedURL)
  .patch(updateShortenedURL)
  .delete(deleteShortenedURL);

export default router;
