const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { authantication } = require("./middlewares/media.middleware");
const { authRouter } = require("./routes/auth.route");
const { mediaRouter } = require("./routes/media.route");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("This is the Home Page");
});
app.use("/users", authRouter);
app.use(authantication);
app.use("/posts", mediaRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Successfull connected with DB");
  } catch (e) {
    console.log(e);
    res.send("Connection Failed With DB");
  }
});
