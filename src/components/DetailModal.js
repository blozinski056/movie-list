import React from "react"

export default function DetailModal(props) {

  function close() {
    props.setDetailModal(false)
  }

  function move() {
    
  }

  function remove() {

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
            <div>
              <button onClick={move}>
                + Move to Watched List
              </button>
              <button onClick={remove}>
                - Remove from Unwatched List
              </button>
            </div>
          :
            <div>
              <button onClick={remove}>
                - Remove from Watched List
              </button>
            </div>
        }
        
      </div>
    </div>
  )
}