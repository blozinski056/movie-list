import React from "react"

export default function DetailModal({details, inUnwatchedList, addToWatched, removeFromWatched, removeFromUnwatched, convertDate, setDetailModal}) {

  function close() {
    setDetailModal(false)
  }

  function move() {
    removeUnwatched()
    addToWatched(
      {
        key: details.id,
        id: details.id,
        poster: details.poster,
        title: details.title,
        date: details.date,
        overview: details.overview,
        cast: details.cast
      }
    )

    close()
  }

  function removeWatched() {
    removeFromWatched(details.id)

    close()
  }

  function removeUnwatched() {
    removeFromUnwatched(details.id)

    close()
  }

  return (
    <div>
      <div className="modal-overlay" onClick={close}></div>

      <div className="detail-modal">
        <img
          className="search-tiles-poster"
          src={details.poster}
          alt="Poster no longer available in API database 😭"
        />
        <h1 className="detail-modal-title">{details.title}</h1>
        <h1 className="detail-modal-date">{convertDate(details.date)}</h1>
        <h5>Starring: {details.cast}</h5>
        <p className="detail-modal-overview">{details.overview}</p>
        {inUnwatchedList(details.id)
          ? <div className="detail-modal-buttons">
              <button className="detail-modal-move" onClick={move}>
                + Move to Watched List
              </button>
              <button className="detail-modal-remove" onClick={removeUnwatched}>
                - Remove from Unwatched List
              </button>
            </div>
          : <div className="detail-modal-buttons">
              <button className="detail-modal-remove" onClick={removeWatched}>
                - Remove from Watched List
              </button>
            </div>
        }
      </div>
    </div>
  )
}