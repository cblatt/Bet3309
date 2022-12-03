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

app.get("/current/:week", (req, res) => {
  let week = req.params.week;
  let query = `SELECT g.game_id, g.game_day, g.away_team, g.home_team, g.away_score, g.home_score, t.games_won AS home_wins, t.games_lost AS home_losses, t.games_tied AS home_ties,
  tt.games_won AS away_wins, tt.games_lost AS away_losses, tt.games_tied AS away_ties
  FROM (Game g JOIN Team t ON g.home_team = t.team_abbrev JOIN Team tt ON g.away_team = tt.team_abbrev) 
  WHERE g.game_id LIKE '%2022_${week}%'`;

  connection.query(query, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.send(data);
  });
});

app.get("/roster/:t_name", (req, res) => {
  let t_name = req.params.t_name;

  let query = `SELECT pf_name, pl_name FROM (
    (SELECT team_name, pf_name, pl_name
      FROM OffensiveFootballPlayer AS offPlayer) 
        UNION
    (SELECT team_name, pf_name, pl_name 
      FROM DefensiveFootballPlayer AS defPlayer)
        UNION
        (SELECT team_name, pf_name, pl_name FROM Kicker AS kickPlayer)) AS teamRoster WHERE team_name= "${t_name}"`;
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
