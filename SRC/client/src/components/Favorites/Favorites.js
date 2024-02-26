// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import "./Favorites.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Favorites() {
//   const [selectedOptions, setSelectedOptions] = useState();
//   const [username, setUsername] = useState("");

//   const [value, setValue] = useState();

//   const navigate = useNavigate();

//   //the list that populates the drop down menu
//   const optionList = [];

//   function handleSelect(data) {
//     setSelectedOptions(data);
//   }

//   useEffect(() => {
//     //we have two routes which is fine because this is a get request getting info on if the user is logged in or not
//     axios.get("/login").then((response) => {
//       console.log(response);
//       //only if the status of logged in is true do we want to show the username
//       if (response.data.loggedIn === true) {
//         setUsername(response.data.user[0].username);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     //sets the teams in the dropdown menu
//     fetch(`${process.env.REACT_APP_BACKEND_URL}/teams`)
// 			.then((res) => res.json())
// 			.then((data) => {
// 				for (let i = 0; i < data.length; i++) {
// 					optionList.push({
// 						value: data[i].team_abbrev,
// 						label: data[i].team_abbrev,
// 					});
// 				}
// 			});
//     showUserFavorites();
//   }, [handleSelect]);

//   //should show the teams that the user has favorited
//   async function showUserFavorites() {
//     if (username !== null) {
//       console.log("the username", username);
//       fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/${username}`)
// 				.then((res) => res.json())
// 				.then((data) => {
// 					console.log(data);
// 					const l = document.getElementById("favorites");
// 					while (l.hasChildNodes()) {
// 						l.removeChild(l.firstChild);
// 					}
// 					for (let i = 0; i < data.length; i++) {
// 						console.log(data[i].fav_team_name);
// 						const li = document.createElement("li");
// 						li.appendChild(document.createTextNode(data[i].fav_team_name + ": "));
// 						l.appendChild(li);
// 						l.appendChild(document.createElement("br"));
// 						const showTeamStatsBtn = document.createElement("button");
// 						showTeamStatsBtn.id = data[i].fav_team_name;
// 						showTeamStatsBtn.innerText = `${showTeamStatsBtn.id} schedule`;
// 						l.appendChild(showTeamStatsBtn);
// 						const deleteBtn = document.createElement("button");
// 						deleteBtn.id = data[i].fav_team_name;
// 						deleteBtn.innerText = `Unfavorite`;
// 						l.appendChild(deleteBtn);

// 						showTeamStatsBtn.addEventListener("click", () => {
// 							const value = showTeamStatsBtn.id;
// 							navigate("/history", { state: { teamName: value } });
// 						});

// 						deleteBtn.addEventListener("click", () => {
// 							fetch(
// 								`${process.env.REACT_APP_BACKEND_URL}/unfavorite/${username}/${showTeamStatsBtn.id}`,
// 								{
// 									method: "POST",
// 									headers: {
// 										"Content-Type": "application/json",
// 										"Content-length": 2,
// 									},
// 								}
// 							);
// 							refresh();
// 						});
// 					}
// 				});
//     }
//   }

//   const refresh = () => {
//     // it re-renders the component
//     setValue({});
//   };

//   function handleSetTeams() {
//     for (let i = 0; i < selectedOptions.length; i++) {
//       console.log(selectedOptions[i].value);
//       fetch(`${process.env.REACT_APP_BACKEND_URL}/team/username`, {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 					"Content-length": 2,
// 				},
// 				//{
// 				body: JSON.stringify({
// 					team: selectedOptions[i].value,
// 					username: username,
// 				}),
// 			});
//     }
//     refresh();
//   }

//   return (
// 		<div id="section">
// 			<div>
//         <br />
// 				<span
// 					style={{
// 						fontSize: "30px",
// 						fontFamily: "Copperplate",
// 						marginLeft: "30px",
// 					}}>
// 					Favorite a team
// 				</span>
// 			</div>

// 			<br />
// 			<div className="favorite-teams">
// 				<div className="dropdown-container">
// 					<Select
// 						options={optionList}
// 						placeholder="Select team(s) to favorite"
// 						onChange={handleSelect}
// 						isSearchable={true}
// 						isMulti
// 					/>
// 				</div>
// 				<br />
// 				<button onClick={handleSetTeams}>Save favorites</button>
// 			</div>
// 			<br />
// 			<br />
// 			<ul id="favorites"></ul>
// 		</div>
// 	);
// }

import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Favorites.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
	const [selectedTeams, setSelectedTeams] = useState([]);
	const [teamsOptions, setTeamsOptions] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch teams to populate the dropdown menu
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/teams`)
			.then((response) => {
				const options = response.data.map((team) => ({
					value: team.team_abbrev,
					label: team.team_abbrev,
				}));
				setTeamsOptions(options);
			})
			.catch((error) => console.error("Fetching teams failed:", error));

		// Load saved favorites from local storage on initial render
		const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
		if (savedFavorites) {
			setSelectedTeams(savedFavorites);
		}
	}, []);

	useEffect(() => {
		// Save selectedTeams to local storage whenever it changes
		localStorage.setItem("favorites", JSON.stringify(selectedTeams));
	}, [selectedTeams]);

	const handleChange = (selectedOptions) => {
		setSelectedTeams(selectedOptions || []);
		

		// Extract the 'value' from each selection and store it in local storage
		const valuesToStore = selectedOptions.map((option) => option.value);
		localStorage.setItem("favourites", JSON.stringify(valuesToStore));
	};

	const handleUnfavorite = (teamValue) => {
		const newSelectedTeams = selectedTeams.filter((team) => team.value !== teamValue);
		setSelectedTeams(newSelectedTeams);
	};

	const handleShowSchedule = (teamValue) => {
    navigate("/history", { state: { teamName: teamValue } });
	};

	return (
		<div id="section">
			<div>
				<br />
				<span style={{ fontSize: "30px", fontFamily: "Copperplate", marginLeft: "30px" }}>
					Favorite a team
				</span>
			</div>
			<br />
			<div className="favorite-teams">
				<div className="dropdown-container">
					<Select
						options={teamsOptions}
						placeholder="Select team(s) to favorite"
						onChange={handleChange}
						isSearchable={true}
						isMulti
						value={selectedTeams}
					/>
				</div>
			</div>
			<br />
			<br />
			<ul id="favorites">
				{selectedTeams.map((team) => (
					<li key={team.value}>
						{team.label}
						<button onClick={() => handleShowSchedule(team.value)}>Schedule</button>
						<button onClick={() => handleUnfavorite(team.value)}>Unfavorite</button>
					</li>
				))}
			</ul>
		</div>
	);
}
