import React from "react"

export default function MenuModal(props) {

  return (
    <div className="menu-modal">
      <h1>{"Watched: " + props.watchedLength}</h1>
      <h1>{"Unwatched: " + props.unwatchedLength}</h1>

      <button className="menu-modal-login">LOG IN</button>

      <div className="menu-modal-drop-down"></div>
    </div>
  )
}