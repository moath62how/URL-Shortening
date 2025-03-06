import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../utils/AppError.js";
import User from "../models/UsersModel.js";

function signJWTToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_PASSOWRD, {
    expiresIn: "1h",
  });

  return token;
}

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user || !(await user.correctPassword(password))) {
    return next(
      new AppError(404, "This password and username combination doesn't exist")
    );
  }
  const payload = { id: user._id };
  const token = signJWTToken(payload);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("token", token, cookieOptions);
  res.status(200).json({ status: "success", token, user });
};

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  let errorMessage = [];
  if (!username) {
    errorMessage.push("You must enter a username");
  }
  if (!email) {
    errorMessage.push("You must enter a email");
  }
  if (!password) {
    errorMessage.push("You must enter a password");
  }
  if (errorMessage.length != 0) {
    return next(new AppError(404, errorMessage.join(", ")));
  }

  try {
    const newUser = await User.create({ username, email, password });
    const token = signJWTToken({ id: newUser._id });
    res.status(201).json({ status: "success", user: newUser, token });
  } catch (e) {
    next(e);
  }
};

export const protect = async (req, _res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  try {
    if (!token)
      return next(
        new AppError(401, "Unauthorized please login and try again!")
      );
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_PASSOWRD
    );
    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new AppError(401, "The user of this token does not exist anymore!")
      );
    req.user = user;
  } catch (e) {
    return next(e);
  }
  next();
};

export const isLoggedIn = async (req, res, next) => {
  if (req.cookies.token) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.token,
      process.env.JWT_SECRET_PASSOWRD
    );
    const user = await User.findById(decoded.id);
    if (!user) return next();
    res.locals.user = user;
    return next();
  }
  next();
};

export const logout = (_req, res, _next) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const permitOnly =
  (...roles) =>
  (req, _res, next) => {
    if (roles.includes(req.user?.role)) return next();
    return next(new AppError(403, "You do not have permission!"));
  };
