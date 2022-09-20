import React from "react"

export default function SearchModal(props) {
  
  return (
    <div>
      <div className="modal-overlay" onClick={() => props.setModal(false)}></div>

      <div className="modal-list">
        {props.makeSearchTiles()}
      </div>

      <div className="modal-drop-down"></div>
    </div>
  )
}