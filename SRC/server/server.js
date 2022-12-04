const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dbConfig = require("../config/db.config");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

app.use(
  cors({
    origin: ["http://localhost:8000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "3316aztdcb",
    resave: false,
    saveUninitialized: false,
    cookie: {
      //means that the cookie expires after 24 hours, so sessions can be maintained for that long
      expires: 60 * 60 * 24,
    },
  })
);

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

app.post("/register", (req, res) => {
  const username = req.body.username;
  const uf_Name = req.body.uf_Name;
  const ul_Name = req.body.ul_Name;
  const email = req.body.email;
  const password = req.body.password;

  let query = `INSERT INTO User VALUES ("${username}", "${uf_Name}", "${ul_Name}", "${email}", "${password}")`;
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  let query = `SELECT * FROM User WHERE username = "${username}" AND password = "${password}"`;

  connection.query(query, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    //there is someone in the db with that username/password combination
    if (result.length > 0) {
      res.json({ auth: true, result: result });
    } else {
      //happens if no user exists
      res.json({ auth: false, message: "No user exists" });
    }
  });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
