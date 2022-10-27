import React from "react"
import MenuModal from "./MenuModal.js"

export default function Navbar(props) {
  const [menuOn, setMenuOn] = React.useState(false)

  // Sends searched keyword back to App.js to use in API search and opens modal
  function searchKeyword(event) {
    event.preventDefault();

    const searchWord = document.querySelector(".nav-search")
    props.setSearch(searchWord.value)
    props.setModal(true)
    props.setDetailModal(false)
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


      <img
        className="nav-menu-icon"
        src="./images/menu-icon.png"
        onClick={() => setMenuOn(prevMenuOn => !prevMenuOn)}
        alt=""
      />

      {menuOn &&
          <MenuModal 
            setModal={props.setModal}
            watchedLength={props.watchedLength()}
            unwatchedLength={props.unwatchedLength()}
          />
      }
    </div>
  )
}