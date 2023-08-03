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

// IDに対応したデータを取得
router.get("/posts/:id", (req, res) => {
  const query = `SELECT * FROM ${process.env.TABLE_NAME}`;
  conection.execute(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    const data = results.map((row) => ({ ...row }));
    const post = data.find((post) => post.id === parseInt(req.params.id));
    res.send(post);
  });
});

// データを保存
router.post("/posts", (req, res) => {
  const { title, published } = req.body;
  const query = `INSERT INTO ${process.env.TABLE_NAME} (title, published) VALUES (?, ?)`;
  conection.execute(query, [title, published], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    const postID = results.insertId;
    const post = {
      id: postID,
      title,
      published,
    };
    res.json(post);
  });
});

// データを更新
router.put("/posts/:id", (req, res) => {
  const { title, published } = req.body;
  const id = req.params.id;
  const query = `UPDATE ${process.env.TABLE_NAME} SET title = ?, published = ? WHERE id = ?`;
  conection.execute(query, [title, published, id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    const post = {
      id,
      title,
      published,
    };
    res.json(post);
  });
});

module.exports = router;
