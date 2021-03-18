const express = require("express");
const {db, query} = require("../database");
const router = express.Router();
const {
  createJWTToken,
  hashPassword,
  transporter,
  transportPromise
} = require("../helper");


// Register Authentication Flow
router.post("/register", async (req, res) => {
  let { username, password, email,} = req.body;
  password = hashPassword(password);
  try {
    const insert = await query(
      `INSERT INTO users (username, email, password, roleID, verified) VALUES ('${username}', '${email}', '${password}', 2, 0)`
    );
    const mailOptions = {
      from: "Admin <dickymaulanaa@gmail.com>",
      to: email,
      subject: "Email Verification",
      html: `<h1>Welcome ${username} to Commerce</h1> <br> <a href="http://localhost:3000/verify?username=${username}&password=${password}">Click Here to Verify your Account</a>`,
    };
    await transportPromise(mailOptions);
    const select = await query(
      `SELECT id, username, email, roleID, verified FROM users WHERE id = ${insert.insertId}`
    );
    const responseData = { ...select[0] };
    responseData.token = createJWTToken(responseData);
    return res.status(200).send(responseData);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// Email Verification
router.post("/email-verification", (req, res) => {
  const { username, password } = req.body;
  const get = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(get, (err, data) => {
    if (err) res.status(500).send(err);

    const idUser = data[0].id;
    const edit = `UPDATE users SET verified = 1 WHERE id = ${idUser}`;
    db.query(edit, (err) => {
      if (err) return res.status(500).send(err);

      const login = `SELECT id, username, email, alamat, roleID, verified FROM users WHERE id = ${idUser}`;
      db.query(login, (err, result) => {
        if (err) return res.status(500).send(err);

        const responseData = { ...result[0] };
        const token = createJWTToken(responseData);
        responseData.token = token;
        return res.status(200).send(responseData);
      });
    });
  });
});

module.exports = router;
