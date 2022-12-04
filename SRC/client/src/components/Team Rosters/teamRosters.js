import React,{useState, useEffect} from "react";
import  Navigation  from "../Navigation/Navigation";
import axios from 'axios';

import "./teamRosters.css"

function TeamRosters() {
  
    const getNames =()=>{
      const l = document.getElementById("names")
      const team = document.getElementById("teams").value
      try{

        axios.get("http://localhost:8000/roster/"+team).then(res=>{
          let players = res.data
          let i =0
          for(i in players){
            players[i] = res.data[i].pf_name.concat(' '+res.data[i].pl_name)
          
          }
          while (l.hasChildNodes()) {
            l.removeChild(l.firstChild);
          }
          for(i in players){
              const li = document.createElement("li")
              li.appendChild(document.createTextNode(players[i]))
              l.appendChild(li)
          }
        })

      }catch{

      }
    }

    const searchDivision = ()=>{
      
      const div = document.getElementById("divisions").value
      try{
        axios.get("http://localhost:8000/divs/"+div).then(res=>{
          let teams = res.data
          let i =0
          for(i in teams){
            teams[i] = res.data[i].team_abbrev
            
          }
          
          const l = document.getElementById("teams")
          let a =0
          for(a in l.options){
            l.remove(0)
          }
          let b =0
          for(b in teams){
            dynamicTeam(teams[b])
          }
        })
        
        }
      
     catch {}
  };

  
  const dynamicTeam = (team) => {
    console.log("HI");
    const l = document.getElementById("teams");
    let node = document.createElement("option");
    node.appendChild(document.createTextNode(team));
    l.appendChild(node);
  };

  return (
    <>
    <Navigation/>
    
    <div id="App">
    <label id="label">Team Rosters</label>
    <div id="one">
    <select id="divisions" onChange = {searchDivision}>
              <option value="">--Select A Division--</option>
                <option value="AFC East">AFC East</option>
                <option value="AFC North">AFC North</option>
                <option value="AFC South">AFC South</option>
                <option value="AFC West">AFC West</option>
                <option value="NFC South">NFC South</option>
                <option value="NFC East">NFC East</option>
                <option value="NFC North">NFC North</option>
                <option value="NFC West">NFC West</option>
                
            </select>
            </div>  
            <div id="two">
    <select id="teams">
    <option value="">--Select A Team--</option>
    </select>
    </div>
     <button id="btn1" onClick ={getNames}>Search Roster</button>
   
     <ul id="names" ></ul>
    </div>

    </>
  );
}
export default TeamRosters;
