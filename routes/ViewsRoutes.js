import { Router } from "express";
import {
  renderGetShortUrl,
  renderPostShortUrl,
  renderLanding,
  renderLogin,
  redirctToURL,
  renderSignUp,
} from "../controllers/viewsController.js";
import { protect, isLoggedIn } from "../controllers/AuthController.js";
const router = Router();

router.route("/").get(isLoggedIn, renderLanding);

//router.route("/").get(renderLanding);
router.route("/login").get(renderLogin);

router.route("/signup").get(renderSignUp);

router
  .route("/shorten")
  .get(protect, isLoggedIn, renderGetShortUrl)

  .post(protect, isLoggedIn, renderPostShortUrl);

router.route("/:shortCode").get(redirctToURL);

export default router;
