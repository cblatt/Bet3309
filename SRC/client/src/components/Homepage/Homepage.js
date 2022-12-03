import React from "react";
import { useEffect, useState } from "react";
import "./Homepage.css";
import Navigation from "../Navigation/Navigation";
import { Button } from "react-bootstrap";

export default function Homepage() {
  // Holds upcoming game info
  const [games, setgames] = useState([]);
  useEffect(() => {
    getGames();
  }, []);

  //Gets all games for selected week
  const getGames = async (id) => {
    let result = await fetch(`http://localhost:8000/current/${id}`);
    result = await result.json();
    setgames(result);
    console.log(id);
  };

  //Check selection of the week and then call get games to display
  function showGames() {
    const week = document.getElementById("list-games").value;
    if ("Week #" != week) {
      getGames(week);
    }
  }

  return (
    <div>
      <Navigation />
      <div>
        <center>
          <br />
          <span style={{ fontSize: "60px", fontFamily: "Impact" }}>
            BET 3309
          </span>
          <br />
          <span style={{ fontSize: "25px", fontFamily: "Copperplate" }}>
            An Application To Get You Rich!
          </span>
        </center>
        <br />
        <span
          style={{
            fontSize: "20px",
            fontFamily: "Copperplate",
            marginLeft: "80px",
          }}
        >
          Upcoming Games:
          <select
            id="list-games"
            onClick={() => {
              showGames();
            }}
          >
            <option value="Week#">Week #</option>
            <option value="01">Week 1</option>
            <option value="02">Week 2</option>
            <option value="03">Week 3</option>
            <option value="04">Week 4</option>
            <option value="05">Week 5</option>
            <option value="06">Week 6</option>
            <option value="07">Week 7</option>
            <option value="08">Week 8</option>
            <option value="09">Week 9</option>
            <option value="10">Week 10</option>
            <option value="11">Week 11</option>
            <option value="12">Week 12</option>
            <option value="13">Week 13</option>
            <option value="14">Week 14</option>
            <option value="15">Week 15</option>
            <option value="16">Week 16</option>
            <option value="17">Week 17</option>
            <option value="18">Week 18</option>
          </select>
        </span>
      </div>
      <table id="t1">
        <tbody>
          <tr>
            <th>Home Team</th>
            <th>Record</th>
            <th>Away Team</th>
            <th>Record</th>
            <th>Game Day</th>
            <th>Game Time</th>
            <th>Prediction</th>
          </tr>

          {games.map((item) => (
            <tr>
              <td>{item.home_team}</td>
              <td>
                {item.home_wins}-{item.home_losses}-{item.home_ties}
              </td>
              <td>{item.away_team}</td>
              <td>
                {item.away_wins}-{item.home_losses}-{item.home_ties}
              </td>
              <td>{item.game_day.slice(0, 10)}</td>
              <td>{item.game_time}</td>

              <td>
                <Button className="btn btn-dark">Predict</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
    </div>
  );
}
