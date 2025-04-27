import AppError from "../utils/AppError.js";
import ShortenedURL from "../models/ShortenedURL.js";
import { randHashGenerator } from "../utils/hashingFunction.mjs";

export const renderLanding = async (_req, res, _next) => {
  res.render("landing");
};

export const renderLogin = (_req, res, _next) => {
  res.render("login");
};

export const renderGetShortUrl = (_req, res) => {
  res.render("index");
};
export const renderPostShortUrl = async (req, res, next) => {
  let { url } = req.body;
  if (!url.includes("https://")) url = "https://" + url;
  const { user } = req;
  try {
    const shortenUrl = await ShortenedURL.create({
      url,
      user,
      shortCode: randHashGenerator(),
    });

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortenUrl.shortCode}`;

    res.render("success", {
      shortUrl,
    });
  } catch (e) {
    next(e);
  }
};

export const redirctToURL = async (req, res, next) => {
  const { shortCode } = req.params;
  console.log(shortCode);
  try {
    const data = await ShortenedURL.findOneAndUpdate(
      { shortCode },
      { $inc: { accessCount: 1 } },
      { new: true, projection: { accessCount: 0 } }
    );
    if (data == null)
      throw new AppError(404, "There is not website with that short code");

    res.redirect(data.url);
  } catch (e) {
    next(e);
  }
};

export const renderSignUp = (req, res, next) => {
  res.render("signup");
};
