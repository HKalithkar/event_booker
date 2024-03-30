import React from 'react'
import "./Footer.css"


export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className='footer-container'>
      <footer>&copy; {year} Event Booker | Developed by Sai Harshith Kalithkar</footer>
    </div>
  )
}
