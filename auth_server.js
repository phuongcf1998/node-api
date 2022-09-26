const express = require("express");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8081;

let refreshTokens = [];

dotenv.config();

const app = express();

app.use(express.json());

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if (err) res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );
    res.json({ accessToken });
  });
});

app.post("/login", (req, res) => {
  const data = req.body;
  console.log({ data });

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60s",
  });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

app.post("/logout", (req, res) => {
  const token = req.body.token;
  refreshTokens = refreshTokens.filter(
    (refreshToken) => refreshToken !== token
  );
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
