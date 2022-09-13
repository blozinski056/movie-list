import React from "react"

export default function Watched(props) {
  
  return (
    <section className="watched">
      <div className="watched-container">
        <h5 className="watched-title">WATCHED</h5>
        {props.tiles}
      </div>
    </section>
  )
}