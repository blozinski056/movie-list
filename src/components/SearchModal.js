import React from "react"
// import SearchTiles from "./SearchTiles.js"

export default function SearchModal(props) {
  
  return (
    <div>
      <div className="modal-overlay"></div>

      <div className="modal-list">
        {/* makeTiles() */}
        {props.makeSearchTiles()}
        <button 
          className="modal-exit-button"
          onClick={() => props.setModal(false)}
        >
          +
        </button>
      </div>

      <div className="modal-drop-down"></div>
    </div>
  )
}