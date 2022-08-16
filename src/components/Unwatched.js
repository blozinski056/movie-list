import React from "react"

export default function Unwatched(props) {
  
  return (
    <section className="unwatched">
      <div className="unwatched-container">
        {props.tiles}
      </div>
    </section>
  )
}