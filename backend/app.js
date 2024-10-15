const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require('path')

const auth = require("./routes/auth");
const transaction = require("./routes/transactions")

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

app.use("/api/v1", auth);
app.use("/api/v1", transaction);

app.use(errorMiddleware);

module.exports = app;
