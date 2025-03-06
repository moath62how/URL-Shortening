import ShortenedURL from "../models/ShortenedURL.js";
import { randHashGenerator } from "../utils/hashingFunction.mjs";
import AppError from "../utils/AppError.js";

export const getAllShortenedURLs = async (req, res, next) => {
  try {
    const pageLimit = parseInt(req.query.limit) || 5;
    const pageNumber = parseInt(req.query.page) || 1;
    const data = await ShortenedURL.find()
      .sort("accessCount")
      .skip((pageNumber - 1) * pageLimit)
      .limit(pageLimit)
      .exec();

    if (!data)
      return next(
        new AppError(404, "There is no urls in the database with that query")
      );
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    next(e);
  }
};

export const getShortenedURL = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const data = await ShortenedURL.findOne({ shortCode });
    if (data == null) {
      next(new AppError(404, "There is no Website with that code!"));
      return;
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    return next(e);
  }
};

export const createShorttenedURL = async (req, res, next) => {
  const { url } = req.body;
  const { _id } = req.user;
  console.log(req.user);
  try {
    const shortCode = randHashGenerator();
    const data = await ShortenedURL.create({ url, shortCode, user: _id });

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (e) {
    next(e);
  }
};

export const updateShortenedURL = async (req, res, next) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  try {
    const data = await ShortenedURL.updateOne(
      { shortCode },
      { url, updatedAt: Date.now() }
    );
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteShortenedURL = async (req, res, next) => {
  const { shortCode } = req.params;
  try {
    const data = await ShortenedURL.deleteOne({ shortCode });
    if (data.deletedCount == 0) {
      return next(new AppError(404, "No document has that code"));
    }
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
