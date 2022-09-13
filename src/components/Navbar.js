import React from "react"

export default function Navbar(props) {

  // Sends searched keyword back to App.js to use in API search and opens modal
  function searchKeyword(event) {
    event.preventDefault();

    const searchWord = document.querySelector(".nav-search")
    props.setSearch(searchWord.value)
    props.setModal(true)
  }

  return (
    <div className="navbar">
      <form className="nav-search-container" onSubmit={searchKeyword}>
        <input
          className="nav-search"
          type="text"
          placeholder="Search"
        />
        <button className="nav-search-button" type="submit" >
          <img src="images/search-icon-white.png" alt="" />
        </button>
      </form>
      
      <h1 className="nav-title">MovieTracker</h1>


      <img className="nav-menu-icon" src="./images/menu-icon.png" />
    </div>
  )
}