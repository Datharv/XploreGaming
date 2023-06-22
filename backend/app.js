const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");
const dotenv = require("dotenv");
const path = require('path');

// config
dotenv.config({
  path: "backend/config/config.env",
});


app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb",extended:true}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

// Static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
