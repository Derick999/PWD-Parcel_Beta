const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bearerToken = require("express-bearer-token");
const port = 2000;
const { transporter } = require("./helper");
const {
  userRouter, 
} = require("./router");

const app = express();

app.use(bearerToken());
app.use(bodyParser());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.status(200).send("<h1>Express API</h1>");
  });

  app.post("/email", (req, res) => {
    const to = req.query.email;
    const mailOptions = {
      from: "Dicky <admin@gmail.com>",
      to,
      subject: "Testing NodeMailer",
      html: `<h1>Hello from nodemailer</h1>`,
    };
    if (to) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.send(500).send(err);
  
        return res.status(200).send({
          message: info,
          status: "Sent",
        });
      });
    }
  });
  
  app.use("/users", userRouter);

app.listen(port, () => console.log(`API active at port ${port}`))