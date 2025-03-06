const ErrorHandleMiddleware = (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  console.log(err);
  if (err.name === "MongoServerError") {
    handleDBError(err);
  } else if (err.name == "TokenExpiredError") {
    handleJWTExpired(res, err);
  } else if ((err.name = "JsonWebTokenError")) {
    handleJWTinvaild(res, err);
  } else if (process.env.NODE_ENV === "production") {
    sendErrProd(err, req, res);
  } else {
    sendErrDev(err, req, res);
  }
};

const sendErrProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).render("error", {
      code: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message || "Something went wrong!",
    });
  }
};

const sendErrDev = (err, req, res) => {
  console.log(err);
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render("error", {
      code: err.statusCode,
      message: err.message,
    });
  }
};

const handleDBError = (err) => {
  const statusCode = 400;
  const errors = Object.values(err.errors).map((e) => e.message);
  message = errors.join(", ");

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

const handleJWTExpired = (res, _err) => {
  res.status(401).json({
    status: "error",
    message: "Token has expired please login agian",
  });
};

const handleJWTinvaild = (res, err) => {
  res.status(201).json({
    status: "error",
    message: err.message,
  });
};
export { ErrorHandleMiddleware };
