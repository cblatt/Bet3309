import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/login/bthomp89@uwo.ca")
      .then((res) => res.json())
      .then((data) => setMessage(data[0].email));
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
