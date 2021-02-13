require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8888;

// app.set("port", process.env.PORT);

app.use(cors());

app.listen(PORT, () => {
  console.log(`We are live on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  // port: 465,
  auth: {
    user: "krenneker16@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
  // tls: {
  //   rejectUnauthorized: false,
  // },
});

app.post("/api/v1/contact", (req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;
    console.log(data);

    var mailOptions = {
      from: "krenneker16@gmail.com",
      // replyto: data.email,
      to: `krenneker16@gmail.com`,
      subject: data.title,
      html: `<p>${data.message}</p>`,
      attachments: [
        {
          filename: data.title + ".jpg",
          contentType: "image/jpeg",
          content: new Buffer.from(
            req.body.image.split("base64,")[1],
            "base64"
          ),
        },
      ],
    };
    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log("line 41: ", error);
        res.status(400).send(error);
      } else {
        res.send("Success");
      }
      smtpTransport.close();
    });
    // next();
  } catch (error) {
    console.log("ERROR: ", error);
  }
});
