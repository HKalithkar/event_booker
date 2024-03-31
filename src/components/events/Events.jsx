import React, { useEffect, useState } from "react";
import "./Events.css";
import { Link } from "react-router-dom";
import Event from "./eventComp/Event";

export default function Events() {
  const [data, setData] = useState();
  const allEvents = async () => {
    const eventResponse = await fetch("http://localhost:3000/events");
    const eventsData = await eventResponse.json();
    setData(
      eventsData.map((event) => (
        <Event
          key={event.eventID}
          eventID={event.eventID}
          title={event.name}
          description={event.description}
          date={event.date}
          author={event.author}
        />
      ))
    );
  };

  const upcoming = async () => {
    const eventResponse = await fetch("http://localhost:3000/events");
    const eventsData = await eventResponse.json();
    setData(
      eventsData
        .filter((event) => (new Date(event.date)) > (new Date()))
        .map((event) => (
          <Event
            key={event.eventID}
            eventID={event.eventID}
            title={event.name}
            description={event.description}
            date={event.date}
          />
        ))
    );
  };

  useEffect(() => {
    allEvents();
  }, []);

  return (
    <div className="events-container">
      <div className="events-options">
        <h4 onClick={allEvents}>All Events</h4>
        <h4 onClick={upcoming}>Upcoming</h4>
        <h4>Registered</h4>
      </div>
      <div className="event-create">
        <Link to="/createEvent">
          <h4>Create New Event</h4>
        </Link>
      </div>
      <div className="event-data">{data}</div>
    </div>
  );
}
