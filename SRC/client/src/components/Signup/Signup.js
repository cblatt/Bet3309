import React, { useState, useEffect } from "react";

export default function Signup() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>SIGNUP PAGE</h1>
      <h1>{message}</h1>
    </div>
  );
}
