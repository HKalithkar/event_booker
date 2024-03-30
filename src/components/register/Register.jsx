import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  function handleRegister(e) {
    let {name, value} = e.target;
    setRegister(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleRegisterForm(e) {
    e.preventDefault();
    if(register.password !== register.reEnterPassword) {
      alert("Re-entered Password does not match with Password");
      return;
    }
    
    const emailResponse = await fetch(`http://localhost:3000/users/email/${register.email}`);
    const emailData = await emailResponse.json();
    if(emailData.found) {
      alert("Email Already Registered");
      return;
    }

    const usernameResponse = await fetch(`http://localhost:3000/users/username/${register.username}`);
    const usernameData = await usernameResponse.json();
    if(usernameData.found) {
      alert("Username Already taken, user different Username");
      return;
    }

    const newUser = {
      fullName: register.fullName,
      username: register.fullName,
      email: register.email,
      password: register.password
    }
    await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    alert("Registration Successful, please Sign In");
    navigate("/signin");
  }

  return (
    <div className="register-container">
      <div className="registered">
        <h4>
          Already Registered ? <Link to="/signin">Click Here</Link> to Sign In
        </h4>
      </div>
      <form className="register-form" onSubmit={handleRegisterForm}>
        <div className="register-fullname">
          <label htmlFor="fullName">Enter Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={handleRegister}
            value={register.fullName}
            required
          />
        </div>
        <div className="register-username">
          <label htmlFor="username">Enter Desired Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleRegister}
            value={register.username}
            required
          />
        </div>
        <div className="register-email">
          <label htmlFor="email">Enter Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleRegister}
            value={register.email}
            required
          />
        </div>
        <div className="register-enterPassword">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleRegister}
            value={register.password}
            required
          />
        </div>
        <div className="register-reEnterPassword">
          <label htmlFor="reEnterPassword">Re-Enter Password</label>
          <input
            type="password"
            id="reEnterPassword"
            name="reEnterPassword"
            onChange={handleRegister}
            value={register.reEnterPassword}
            required
          />
        </div>
        <div className="register-submit">
          <button className="register-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
