import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem("username");
    navigate("/");
    location.reload()
  }

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <h2>Event Booker</h2>
      </div>
      <div className="navbar-sections">
        <Link to="/">
          <h4>Home</h4>
        </Link>
        <Link to="/events">
          <h4>Events</h4>
        </Link>
      </div>
      <div className="navbar-account">
        {localStorage.getItem("username") ? (
          <>
            <Link to="/myAccount">
              <h4>{localStorage.getItem("username")}</h4>
            </Link>
            <h4 onClick={handleLogout} style={{ cursor: "pointer" }}>
              LogOut
            </h4>
          </>
        ) : (
          <Link to="/signin">
            <h4>Sign In</h4>
          </Link>
        )}
      </div>
    </div>
  );
}
