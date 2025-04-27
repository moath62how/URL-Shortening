const ErrorHandleMiddleware = (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;

  if (err.name === "MongoServerError") {
    const { status, message } = handleDBError(err);
    sendError(res, req, status, message);
    res.clearCookie("token");
  } else if (err.name === "TokenExpiredError") {
    const { status, message } = handleJWTExpired();
    sendError(res, req, status, message);
    res.clearCookie("token");
  } else if (err.name === "JsonWebTokenError") {
    const { status, message } = handleJWTInvalid(err);
    sendError(res, req, status, message);
    res.clearCookie("token");
  } else if (process.env.NODE_ENV === "production") {
    sendErrProd(err, req, res);
  } else {
    sendErrDev(err, req, res);
  }
};

const sendError = (res, req, status, message) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(status).json({ status: "error", message });
  } else {
    res.status(status).render("error", { code: status, message });
  }
};

const sendErrProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message || "Something went wrong!",
    });
  } else {
    res.status(err.statusCode).render("error", {
      code: err.statusCode,
      message: err.message,
    });
  }
};

const sendErrDev = (err, req, res) => {
  console.log(req.originalUrl);
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

const handleDuplicateFieldsDB = () => {
  return "Duplicate field value, please use another value!";
};

const handleDBError = (err) => {
  let message = "Unknown error happened";
  if (err.code === 11000) message = handleDuplicateFieldsDB();
  return {
    status: 400,
    message,
  };
};

const handleJWTExpired = () => {
  return {
    status: 401,
    message: "Token has expired, please login again",
  };
};

const handleJWTInvalid = (err) => {
  return {
    status: 401,
    message: err.message,
  };
};

export { ErrorHandleMiddleware };
