import React from "react"

export default function Unwatched(props) {
  
  return (
    <section className="unwatched">
      <div className="unwatched-container">
        <h5 className="unwatched-title">UNWATCHED</h5>
        <div className="unwatched-tile-container">
          {props.tiles}
        </div>
      </div>
    </section>
  )
}