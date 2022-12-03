import React from "react";
import "./Homepage.css"
import  Navigation  from "../Navigation/Navigation";

export default function Homepage() {






  return (
  
    <body>
        <Navigation/>
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
        <br/>
        <span style={{ fontSize: "20px", fontFamily: "Copperplate",marginLeft:"80px"}}>
            Upcoming Games:
          </span>
      </div>
        <table id="t1">
        <tbody>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Game Day</th>
            <th>Game Time</th>
            <th>Info</th>
          </tr>
      
        </tbody>
      </table>
      </body>
      
  );
}
