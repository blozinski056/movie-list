import React from "react"

export default function SearchModal(props) {
  
  return (
    <div className="search-modal">
      <div className="modal-overlay" onClick={() => props.setModal(false)}></div>
      <div className="modal-list">
        {props.searchList.length > 0
          ? props.searchList
          : <h1>No movies found!</h1>
        }
      </div>
      <div className="modal-drop-down"></div>
    </div>
  )
}