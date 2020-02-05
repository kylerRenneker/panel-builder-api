const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 4444;
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.listen(port, () => {
  console.log("We are live on port 4444");
});
app.get("/", (req, res) => {
  res.send("Welcome to my api");
});
