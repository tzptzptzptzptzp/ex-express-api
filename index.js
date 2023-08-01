require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");

// ポート番号の定義
const PORT = 3000;

// データベース接続
const conection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// サーバーの作成
app.get("/", (req, res) => {
  console.log(
    `Access to http://localhost:${PORT}${req.baseUrl} has been detected.`
  );
  res.send(
    `<h1>The browser is accessing <a href="http://localhost:${PORT}${req.baseUrl}">http://localhost:${PORT}${req.baseUrl}</a>.</h1>`
  );
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server Running http://localhost:${PORT}`);
});
