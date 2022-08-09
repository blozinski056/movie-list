import React from "react"

export default function Navbar() {

  return (
    <div className="navbar">
      <div className="nav-search-container">
        <input className="nav-search" placeholder="Search" />
        <button className="nav-search-button" />
      </div>
      
      <h1 className="nav-title">MovieTracker</h1>
    </div>
  )
}