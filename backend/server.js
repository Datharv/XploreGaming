const app = require("./app");

const dotenv = require("dotenv");

const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// uncaught eroor

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaughtException`);
  process.exit(1);
});

// config
dotenv.config({
  path: "config/config.env",
});

// Connective to databasse

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled promice rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled Promice Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
