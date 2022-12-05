import React,{useState, useEffect} from "react";
import  Navigation  from "../Navigation/Navigation";

import axios from 'axios';

export default function PlayerSearch() {
    
    return(
        <>
        <Navigation/>
        <div id="main">
        <label>Offensive Stats</label>
        <label>Defensive Stats</label>
        <label>Kicker Stats</label>
        </div>
        </>
    )
}