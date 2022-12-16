import React from "react";

export default function DetailModal({
  details,
  inUnwatchedList,
  addToWatched,
  removeFromWatched,
  removeFromUnwatched,
  convertDate,
  setModal,
}) {
  function close() {
    setModal(0);
  }

  function move() {
    removeUnwatched();
    addToWatched(details);

    close();
  }

  function removeWatched() {
    removeFromWatched(details.id);

    close();
  }

  function removeUnwatched() {
    removeFromUnwatched(details.id);

    close();
  }

  return (
    <div className="detail-modal">
      <img
        className="dm-poster"
        src={details.poster}
        alt="Poster no longer available in API database 😭"
      />
      <h1 className="dm-title">{details.title}</h1>
      <h1 className="dm-date">{convertDate(details.date)}</h1>
      <h5>Starring: {details.cast}</h5>
      <p className="dm-overview">{details.overview}</p>
      {inUnwatchedList(details.id) ? (
        <div className="dm-buttons">
          <button className="dm-move" onClick={move}>
            + Move to Watched List
          </button>
          <button className="dm-remove" onClick={removeUnwatched}>
            - Remove from Unwatched List
          </button>
        </div>
      ) : (
        <div className="dm-buttons">
          <button className="dm-remove" onClick={removeWatched}>
            - Remove from Watched List
          </button>
        </div>
      )}
    </div>
  );
}
