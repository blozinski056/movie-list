import React from "react";

export default function Tiles({ movie, setModal, setDetails }) {
  function showDetails() {
    // some animation to transition
    setDetails(movie);
    setModal(2);
  }

  return (
    <div className="tiles" onClick={showDetails}>
      <img
        className="tiles-poster"
        src={movie.poster}
        alt="Poster no longer available in API database 😭"
      />
    </div>
  );
}
