import express, { json } from "express";

import morgan from "morgan";
import pkg from "body-parser";
const { urlencoded } = pkg;
import path from "path";
import AppError from "./utils/AppError.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

import ShortenedURLRoutes from "./routes/ShortenedURLRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ViewsRoutes from "./routes/ViewsRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

import { ErrorHandleMiddleware } from "./utils/errorHandler.js";

import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV == "dev") app.use(morgan("dev"));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", ViewsRoutes);
app.use("/api/v1/shorten", ShortenedURLRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("*", (req, _res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(ErrorHandleMiddleware);

export default app;
