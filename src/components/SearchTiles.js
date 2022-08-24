import React from "react"

export default function SearchTiles(props) {

  return (
    <div className="search-tiles">
      <div className="search-tiles-poster-container">
        <img
          className="search-tiles-poster"
          src={props.poster}
          alt="Image no longer available 😭"
        />
      </div>

      <div className="search-tiles-info">
        <div className="search-tiles-header">
          <h1 className="search-tiles-title">{props.title}</h1>
          <h1 className="search-tiles-date">{props.date}</h1>
        </div>
        <p>{props.overview}</p>
      </div>
    </div>
  )
}