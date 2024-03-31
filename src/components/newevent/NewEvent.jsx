import React, { useEffect, useState } from "react";
import "./NewEvent.css"
import { useNavigate } from "react-router-dom";

export default function NewEvent() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [event, setEvent] = useState({
    eventID: "",
    author: "",
    name: "",
    description: "",
    date: "",
  });

  const initial = async () => {
    const authresponse = await fetch(
      `http://localhost:3000/userDetails/${localStorage.getItem("username")}`
    );
    const authdata = await authresponse.json();

    const idResponse = await fetch("http://localhost:3000/events");
    const idData = await idResponse.json();
    const id = idData.length + 1;

    setEvent((prev) => ({
      ...prev,
      author: authdata.fullName,
      eventID: id 
    }))
  };

  function handleEvent(e) {
    const {name, value} = e.target;
    setEvent(prev => ({
        ...prev,
        [name]: value,
    }));
  }
  
  async function handleEventForm(e) {
    e.preventDefault();
    await fetch("http://localhost:3000/api/auth/newEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
    alert("Event Created");
    navigate("/events");
  }

  useEffect(() => {
    if(!localStorage.getItem("username")) {
     alert("Please Sign in to create new event");
     navigate("/signin");
     return
    }
     initial();
  }, []);

  return (
    <div className="new-event-container">
      <h4>Enter Details to Create new Event</h4>
      <form className="new-event-form" onSubmit={handleEventForm}>
        <div className="new-eventID">
          <label htmlFor="eventID">Event ID</label>
          <input type="text" id="eventID" name="eventID" value={event.eventID} style={{textAlign: 'center', backgroundColor: 'lightgray'}} readOnly />
        </div>
        <div className="new-title">
          <label htmlFor="title">Enter Title</label>
          <input type="text" id="title" name="name" value={event.name} onChange={handleEvent} required />
        </div>
        <div className="new-description">
          <label htmlFor="description">Enter Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            style={{ resize: "none" }}
            value={event.description}
            onChange={handleEvent}
            required
          />
        </div>
        <div className="new-date">
          <label htmlFor="date">Date of Event</label>
          <input type="date" id="date" name="date" min={today} value={event.date} onChange={handleEvent} required />
        </div>
        <div className="new-submit">
          <button className="new-button" type="submit">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}
