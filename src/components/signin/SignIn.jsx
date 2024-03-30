import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  function handleSignin(e) {
    let { name, value } = e.target;
    setSignin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSigninForm(e) {
    e.preventDefault();

    const data = {
      email: signin.email,
      password: signin.password,
    };
    const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const loginData = await loginResponse.json();
    if (loginData.notFound) {
      alert("User not found");
      return;
    }
    localStorage.setItem("username", loginData.username);
    navigate("/");
    location.reload();
  }

  return (
    <div className="signin-container">
      <div className="no-account">
        <h4>
          Don't have an account ? <Link to="/register">Register Here</Link>
        </h4>
      </div>
      <form className="signin-form" onSubmit={handleSigninForm}>
        <div className="signin-email">
          <label htmlFor="email">Enter Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={signin.email}
            onChange={handleSignin}
            required
          />
        </div>
        <div className="signin-password">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signin.password}
            onChange={handleSignin}
            required
          />
        </div>
        <div className="signin-submit">
          <button className="signin-button" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
