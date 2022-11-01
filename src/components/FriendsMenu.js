import React from "react"

export default function FriendsMenu({setFriendsMenu, friendsTilesList, addFriend}) { 

  return (
    <div className="friends-menu">
      <div className="fm-overlay" onClick={() => setFriendsMenu(false)}></div>
      <div className="fm-info-container">
        <div className="fm-info">
          {friendsTilesList}
          <button className="fm-add-friend" onClick={addFriend}>+ Add a Friend</button>
        </div>
      </div>
    </div>
  )
}