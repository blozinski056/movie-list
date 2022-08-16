import React from "react"

export default function Watched(props) {
  
  return (
    <section className="watched">
      <div className="watched-container">
        {props.tiles}
      </div>
    </section>
  )
}