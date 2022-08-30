import React from "react"

export default function Tiles(props) {

  return (
    <div className="tiles">
      <div>
        <img className="tiles-poster" src={props.poster} />
      </div>
      <h1 className="tiles-title">{props.title}</h1>
    </div>
  )
}