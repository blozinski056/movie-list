import React from "react"

export default function Tiles(props) {

  return (
    <div className="tile">
      <div>
        {props.poster}
      </div>
      <div>
        <h1>{props.title}</h1>
        <h5>{props.year}</h5>
      </div>
      {/* contain description on back of card or on hover */}
    </div>
  )
}