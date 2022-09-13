import React from "react"

export default function DetailModal(props) {

  function close() {
    props.setDetailModal(false)
  }

  function move() {
    removeUnwatched()
    props.addToWatched(
      {
        key: props.id,
        id: props.id,
        poster: props.poster,
        title: props.title,
        date: props.date,
        overview: props.overview
      }
    )

    close()
  }

  function removeWatched() {
    props.removeFromWatched(props.id)

    close()
  }

  function removeUnwatched() {
    props.removeFromUnwatched(props.id)

    close()
  }

  return (
    <div>
      <div className="modal-overlay" onClick={close}></div>

      <div className="detail-modal">
        <img
          className="search-tiles-poster"
          src={props.poster}
          alt="Poster no longer available in API database 😭"
        />
        <h1 className="detail-modal-title">{props.title}</h1>
        <h1 className="detail-modal-date">{props.date}</h1>
        <p className="detail-modal-overview">{props.overview}</p>

        {props.inUnwatchedList(props.id)
          ?
            <div className="detail-modal-buttons">
              <button className="detail-modal-move" onClick={move}>
                + Move to Watched List
              </button>
              <button className="detail-modal-remove" onClick={removeUnwatched}>
                - Remove from Unwatched List
              </button>
            </div>
          :
            <div className="detail-modal-buttons">
              <button className="detail-modal-remove" onClick={removeWatched}>
                - Remove from Watched List
              </button>
            </div>
        }
        
      </div>
    </div>
  )
}