import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";

export default function Logout() {
  useEffect(() => {
    fetch("/logOutUser");
  }, []);
  return (
    <div>
      <Navigation />
      <h1>Logout</h1>
    </div>
  );
}
