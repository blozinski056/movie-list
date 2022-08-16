import React from "react"

export default function Navbar(props) {

  // Sends searched keyword back to App.js to use in API search
  function searchKeyword(event) {
    event.preventDefault();

    const searchWord = document.querySelector(".nav-search")
    props.search(searchWord.value)
    props.modal(true)
    console.log(searchWord.value)
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
    </div>
  )
}