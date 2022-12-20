import React from "react";

export default function Navbar({
  username,
  setSearch,
  setModal,
  setMenuOn,
  signedIn,
  // setFriendsMenu,
}) {
  // Sends searched keyword back to App.js to use in API search and opens modal
  function searchKeyword(event) {
    event.preventDefault();

    const searchWord = document.querySelector(".nav-search");
    setSearch(searchWord.value);
    setModal(1);
    setMenuOn(false);
  }

  function openFriendsMenu() {
    setMenuOn(false);
    // setFriendsMenu((prevFriendsMenu) => !prevFriendsMenu);
  }

  function openMenuModal() {
    // setFriendsMenu(false);
    setMenuOn((prevMenuOn) => !prevMenuOn);
  }

  return (
    <nav className="navbar">
      <form className="nav-search-container" onSubmit={searchKeyword}>
        <input className="nav-search" type="text" placeholder="Search" />
        <button className="nav-search-button" type="submit">
          <img src="images/search-icon-white.png" alt="" />
        </button>
      </form>
      <h1 className="nav-title">MovieTracker</h1>
      <div className="nav-search-menus">
        {signedIn === 1 && (
          <div>
            <h3>Welcome, {username}!</h3>
            {/* <img
              className="friends-menu-icon"
              src="./images/friends-icon.png"
              onClick={openFriendsMenu}
              alt=""
            /> */}
          </div>
        )}
        <img
          className="nav-menu-icon"
          src="./images/menu-icon.png"
          onClick={openMenuModal}
          alt=""
        />
      </div>
    </nav>
  );
}
