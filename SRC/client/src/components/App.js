import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import PlayerSearch from "./Player Search/PlayerSearch";
import teamRosters from "./Team Rosters/teamRosters";
import Standings from "./Standings/Standings";

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
              element={<teamRosters></teamRosters>}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
