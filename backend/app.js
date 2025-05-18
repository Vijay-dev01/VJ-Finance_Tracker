const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require('path')
const cors = require("cors");

const auth = require("./routes/auth");
const transaction = require("./routes/transactions")

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
}
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

app.use(
    cors
)

// In server.js or app.js
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

app.use("/api/v1", auth);
app.use("/api/v1", transaction);

app.use(errorMiddleware);

module.exports = app;
