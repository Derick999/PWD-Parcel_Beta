const nodemailer = require("nodemailer");
const util = require("util");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dickymaulanaa@gmail.com",
    pass: "qdxayhbveeydorrq",
  },
});
const transportPromise = util.promisify(transporter.sendMail).bind(transporter);

module.exports = { transporter, transportPromise };

