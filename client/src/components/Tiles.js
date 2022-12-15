import React from "react";

export default function Tiles(props) {
  function showDetails() {
    // some animation to transition
    props.setDetails({
      id: props.id,
      poster: props.poster,
      title: props.title,
      date: props.date,
      overview: props.overview,
      cast: props.cast,
    });
    props.setModal(2);
    // props.setDetailModal(true);
  }

  return (
    <div className="tiles" onClick={showDetails}>
      <img
        className="tiles-poster"
        src={props.poster}
        alt="Poster no longer available in API database 😭"
      />
    </div>
  );
}
