import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Favorites.css";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [selectedOptions, setSelectedOptions] = useState();
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  let changePage = false;
  let teamName;

  //the list that populates the drop down menu
  const optionList = [];

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  useEffect(() => {
    //we have two routes which is fine because this is a get request getting info on if the user is logged in or not
    axios.get("/login").then((response) => {
      console.log(response);
      //only if the status of logged in is true do we want to show the username
      if (response.data.loggedIn === true) {
        setUsername(response.data.user[0].username);
      }
    });
  }, []);

  useEffect(() => {
    //sets the teams in the dropdown menu
    fetch("/teams")
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          optionList.push({
            value: data[i].team_abbrev,
            label: data[i].team_abbrev,
          });
        }
      });
  }, [handleSelect]);

  //should show the teams that the user has favorited
  async function showUserFavorites() {
    if (username !== null) {
      console.log("the username", username);
      fetch(`/favorites/${username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const l = document.getElementById("favorites");
          while (l.hasChildNodes()) {
            l.removeChild(l.firstChild);
          }
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].fav_team_name);
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(data[i].fav_team_name));
            l.appendChild(li);
            const showTeamStatsBtn = document.createElement("button");
            showTeamStatsBtn.id = data[i].fav_team_name;
            showTeamStatsBtn.innerText = "Show team info";
            l.appendChild(showTeamStatsBtn);

            showTeamStatsBtn.addEventListener("click", () => {
              const value = showTeamStatsBtn.id;
              navigate("/history", { state: { teamName: value } });
            });
          }
        });
    }
  }

  function handleSetTeams() {
    console.log("we are in handle set teams", selectedOptions);
    for (let i = 0; i < selectedOptions.length; i++) {
      console.log(selectedOptions[i].value);
      fetch(`/team/username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-length": 2,
        },
        //{
        body: JSON.stringify({
          team: selectedOptions[i].value,
          username: username,
        }),
      });
    }
  }
  showUserFavorites();

  return (
    <div>
      <Navigation />
      <h2>Favorite a team</h2>
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Select color"
          //   value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
      <br />
      <button onClick={handleSetTeams}>Save favorites</button>
      <br />
      <ul id="favorites"></ul>
    </div>
  );
}
