import { useEffect, useState } from "react";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameReg, setFirstName] = useState(null);
  const [lastNameReg, setLastName] = useState(null);
  const [emailReg, setEmail] = useState(null);
  const [passwordReg, setPasswordReg] = useState(null);
  // const [confirmPassword, setConfirmPassword] = useState(null);

  const [loginStatus, setLoginStatus] = useState(false);

  //needed to connect FE to BE with sessions (doesn't work without this)
  axios.defaults.withCredentials = true;

  const handleInputChange = (e) => {
    //you get the id and value entered in the input box
    const { id, value } = e.target;
    //if id is firstName, you set the setFirstName to the value in the input box (so on for the other ones)
    if (id === "username" || id === "usernameReg") {
      setUsername(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "firstNameReg") {
      setFirstName(value);
    }
    if (id === "lastNameReg") {
      setLastName(value);
    }
    if (id === "emailReg") {
      setEmail(value);
    }
    if (id === "passwordReg") {
      setPasswordReg(value);
    }
    // if (id === "confirmPassword") {
    //   setConfirmPassword(value);
    // }
  };

  useEffect(() => {
    //we have two routes which is fine because this is a get request getting info on if the user is logged in or not
    axios.get("/login").then((response) => {
      console.log(response);
      //only if the status of logged in is true do we want to show the username
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].email);
      }
    });
  }, []);

  //inserts the user into the database upon registration
  const handleRegisterBtn = (event) => {
    event.preventDefault();
    fetch(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-length": 2,
      },
      //{
      body: JSON.stringify({
        username: username,
        uf_Name: firstNameReg,
        ul_Name: lastNameReg,
        email: emailReg,
        password: passwordReg,
      }),
    }).then(alert(`The user has been successfully added`));
  };

  function handleLogin(event) {
    event.preventDefault();
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          //this is how we are getting our token and saving it to local storage
          localStorage.setItem("token", response.data.token);
          setLoginStatus(true);
          navigate("/homepage");
        }
      });
  }

  return (
    <div>
      <div className="Auth-form-container">
        <h1>{loginStatus}</h1>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                id="username"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                id="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="Auth-form-container mt-5">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>
            <div className="form-group mt-3">
              <label>First name</label>
              <input
                type="text"
                id="firstNameReg"
                className="form-control mt-1"
                placeholder="Enter first name"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Last name</label>
              <input
                type="text"
                id="lastNameReg"
                className="form-control mt-1"
                placeholder="Enter last name"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                id="usernameReg"
                className="form-control mt-1"
                placeholder="Enter username"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                id="passwordReg"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                className="btn btn-primary"
                onClick={() => handleRegisterBtn()}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
