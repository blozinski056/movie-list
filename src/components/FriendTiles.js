import React from "react"

export default function FriendTiles({id, profilePic, username, watchedCount, unwatchedCount, profileURL, removeFriend}) {
  function openProfile() {
    console.log("Opens user's profile")
  }

  return (
    <div className="friend-tiles" title="Click to see profile" onClick={openProfile}>
      <img src={profilePic} className="ft-profile-pic" alt="" />
      <div className="ft-info">
        <h1>{username}</h1>
        <h5>Movies Watched: {watchedCount}</h5>
        <h5>Movies Unwatched: {unwatchedCount}</h5>
      </div>
      <img
        src="./images/unfriend-icon.png" 
        className="ft-unfriend" 
        title="Remove friend" 
        alt="" 
        onClick={() => removeFriend(id)}
      />
    </div>
  )
}