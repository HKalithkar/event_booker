import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='home-container'>
      <h2>Welcome to Event Booker</h2>
      <h3>where you can create or join events</h3>
      <p>Explore events or Sign In</p>
      <div className='home-options'>
        <Link to="/events"><button className='home-buttons'>Explore Events</button></Link>
        {
          localStorage.getItem("username") ?
          <></> :
          <Link to="/signin"><button className='home-buttons'>Sign In</button></Link>
        }
      </div>
    </div>
  )
}
