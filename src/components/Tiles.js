import React from "react"
import DetailModal from "./DetailModal.js"

export default function Tiles(props) {
  const [detailModal, setDetailModal] = React.useState(false)

  function showDetails() {
    // some animation to transition
    setDetailModal(true)
  }

  return (
    <div>
      <div className="tiles" onClick={showDetails}>
        <img className="tiles-poster" src={props.poster} />
      </div>

      {detailModal &&
        <DetailModal 
          id={props.id}
          poster={props.poster}
          title={props.title}
          date={props.date}
          overview={props.overview}
          inWatchedList={props.inWatchedList}
          inUnwatchedList={props.inUnwatchedList}
          setDetailModal={setDetailModal}
        />
      }
    </div>
  )
}