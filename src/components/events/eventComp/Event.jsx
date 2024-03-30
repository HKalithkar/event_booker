import React, { useState } from "react";
import "./Event.css";

export default function Event(props) {
  const [registered, setRegistered] = useState("");
  const userRegistered = async () => {
    const response = await fetch(
      `http://localhost:3000/eventRegistered/${localStorage.getItem(
        "username"
      )}/${props.eventID}`
    );
    const data = await response.json();
    if (data.registered) {
      setRegistered("Registered");
    } else {
      setRegistered("Register");
    }
  };
  userRegistered();

  async function handleRegistration(e) {
    const status = e.target.textContent;
    if (status === "Registered") {
      return;
    }
    await fetch(
      `http://localhost:3000/api/auth/registerEvent/${localStorage.getItem(
        "username"
      )}/${props.eventID}`,
      {
        method: "PATCH",
      }
    );
    location.reload();
  }

  const today = new Date();
  const date = new Date(props.date);
  const status = date > today;
  return (
    <div className="event">
      <h4>
        {props.eventID}: {props.title}
      </h4>
      <p>{props.description}</p>
      <p className="event-date">{props.date}</p>
      <div className="event-status">
        <p>{status ? "Upcoming" : "Completed"}</p>
        <p onClick={handleRegistration}>{registered}</p>
      </div>
    </div>
  );
}
