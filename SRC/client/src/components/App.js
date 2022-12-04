import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import PlayerSearch from "./Player Search/PlayerSearch";
import TeamRosters from "./Team Rosters/teamRosters";
import Standings from "./Standings/Standings";
import LeagueLeaders from "./League Leaders/LeagueLeaders.js"

function App() {
  return (
    <div style={{ minHeight: "100vh", minWidth: "100vh" }}>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login></Login>} />
            <Route exact path="/signup" element={<Signup></Signup>} />
            <Route exact path="/homepage" element={<Homepage></Homepage>} />
            <Route exact path="/standings" element={<Standings></Standings>} />
            <Route
              exact
              path="/player-search"
              element={<PlayerSearch></PlayerSearch>}
            />
            <Route
              exact
              path="/teamRosters"
              element={<TeamRosters></TeamRosters>}
            />
            <Route 
            exact
            path="/league-leaders"
            element={<LeagueLeaders></LeagueLeaders>}
            />
          </Routes>
          
        </Router>
      </div>
    </div>
  );
}

export default App;
