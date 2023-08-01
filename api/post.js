require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// データベース接続
const conection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// 全てのデータを取得
router.get("/posts", (req, res) => {
  const query = `SELECT * FROM ${process.env.TABLE_NAME}`;
  conection.execute(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    const data = results.map((row) => ({ ...row }));
    res.send(data);
  });
});

module.exports = router;
