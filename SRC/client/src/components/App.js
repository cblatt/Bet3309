import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import PlayerSearch from "./Player Search/PlayerSearch";

function App() {
  return (
    <div style={{ minHeight: "100vh", minWidth: "100vh" }}>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login></Login>} />
            <Route exact path="/signup" element={<Signup></Signup>} />
            <Route exact path="/homepage" element={<Homepage></Homepage>} />
            <Route exact path="/player-search" element={<PlayerSearch></PlayerSearch>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
