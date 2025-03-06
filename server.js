import app from "./app.js";
const port = process.env.PORT || 3000;
import { connect } from "mongoose";
connect("mongodb://localhost:27017/URLShortener")
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((err) => {
    console.log("error connecting to the database: " + err);
  });

app.listen(port, () => {
  console.log(
    "Server (running in  " +
      process.env.NODE_ENV +
      ") is now listening on " +
      port
  );
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION❗ SHUTTING DOWN....");

  console.log("Server closed. Exiting...");
  return process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Uncaught Exception❗ SHUTTING DOWN....");

  return process.exit(1);
});
