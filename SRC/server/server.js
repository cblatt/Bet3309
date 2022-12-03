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

// app.get("/login/:email", (req, res) => {
//   let email = req.params.email;
//   //let password = req.body.password;
//   let password = "password";
//   let query = `SELECT * FROM User WHERE email = "${email}" AND password="${password}"`;
//   connection.query(query, (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(data);
//     res.send(data);
//   });
// });

app.get("/upcoming/:week", (req, res) => {
  let week = req.params.week;
  let query = `SELECT game_day, game_time, away_team, home_team FROM Game WHERE game_id LIKE '%2022_${week}%'`;
  connection.query(query, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.send(data);
  });
});

app.get("/roster/:t_name",(req,res)=>{
  let t_name = req.params.t_name;

  let query = `SELECT pf_name, pl_name FROM (
    (SELECT team_name, pf_name, pl_name
      FROM OffensiveFootballPlayer AS offPlayer) 
        UNION
    (SELECT team_name, pf_name, pl_name 
      FROM DefensiveFootballPlayer AS defPlayer)
        UNION
        (SELECT team_name, pf_name, pl_name FROM Kicker AS kickPlayer)) AS teamRoster WHERE team_name= "${t_name}"`
    connection.query(query, (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(data);
        res.send(data);
        });
})

app.get('/off/stats/:player', (req, res) => {
  let player = req.params.player;
  let query = `SELECT * FROM OffensiveFootballPlayer WHERE pl_name LIKE "%${player}%" OR pf_name LIKE "%${player}"`;
  connection.query(query, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(data);
    res.send(data);
  }) 
});

app.get('/def/stats/:player', (req, res) => {
  let player = req.params.player;
  let query = `SELECT * FROM DefensiveFootballPlayer WHERE pl_name LIKE "%${player}%" OR pf_name LIKE "%${player}"`;
  connection.query(query, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(data);
    res.send(data);
  })
});

app.get('/kick/stats/:player', (req, res) => {
  let player = req.params.player;
  let query = `SELECT * FROM Kicker WHERE pl_name LIKE "%${player}%" OR pf_name LIKE "%${player}"`;
  connection.query(query, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(data);
    res.send(data);
  })
});

app.get('/team/stats/:tName', (req, res) => {
  let tName = req.params.tName;
  let query = `SELECT * FROM Team INNER JOIN TeamAbbreviation ON Team.team_abbrev =  TeamAbbreviation.team_abbrev WHERE team_name LIKE "%${tName}%" OR team_city LIKE "%${tName}%" OR Team.team_abbrev LIKE "%${tName}%"`;
  connection.query(query, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(data);
    res.send(data);
  })
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
