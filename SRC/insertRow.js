const connection = require("./db.js");
const mysql = require("mysql");

function insertRow(data, table) {
  let insertQuery = "";
  let query = null;
  if (table == "Division") {
    insertQuery = "INSERT INTO ?? (??,??) VALUES (?,?)";
    query = mysql.format(insertQuery, [
      "Division",
      "div_name",
      "conf_name",
      data.div_name,
      data.conf_name,
    ]);
  } else if (table == "Team") {
    insertQuery =
      "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    query = mysql.format(insertQuery, [
      "Team",
      "team_abbrev",
      "team_city",
      "div_name",
      "games_won",
      "games_lost",
      "games_tied",
      "points_for",
      "rush_yards",
      "pass_yards",
      "total_yards",
      "points_against",
      "rush_yards_against",
      "pass_yards_against",
      "total_yards_against",
      data.team_abbrev,
      data.team_city,
      data.div_name,
      data.games_won,
      data.games_lost,
      data.games_tied,
      data.points_for,
      data.rush_yards,
      data.pass_yards,
      data.total_yards,
      data.points_against,
      data.rush_yards_against,
      data.pass_yards_against,
      data.total_yards_against,
    ]);
  } else if (table == "Game") {
    insertQuery =
      "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    query = mysql.format(insertQuery, [
      "Game",
      "game_id",
      "game_day",
      "game_time",
      "away_team",
      "away_score",
      "home_team",
      "home_score",
      data.game_id,
      data.game_day,
      data.game_time,
      data.away_team,
      data.away_score,
      data.home_team,
      data.home_score,
    ]);
  } else if (table == "Tracks") {
    insertQuery =
      "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    query = mysql.format(insertQuery, [
      "Tracks",
      "track_id",
      "album_id",
      "album_title",
      "artist_id",
      "artist_name",
      "tags",
      "track_date_created",
      "track_date_recorded",
      "track_duration",
      "track_genres",
      "track_language_code",
      "track_listens",
      "track_number",
      "track_title",
      data.track_id,
      data.album_id,
      data.album_title,
      data.artist_id,
      data.artist_name,
      data.tags,
      data.track_date_created,
      data.track_date_recorded,
      hmsToSecondsOnly(data.track_duration),
      data.track_genres,
      data.track_language_code,
      data.track_listens,
      data.track_number,
      data.track_title,
    ]);
  } else {
    //do nothing
  }
  connection.query(query, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

module.exports = insertRow;
