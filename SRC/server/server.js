const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const app = express();

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/login/:email", (req, res) => {
  let email = req.params.email;
  //let password = req.body.password;
  let password = "password";
  let query = `SELECT * FROM User WHERE email = "${email}" AND password="${password}"`;
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
    res.send(data);
  });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
