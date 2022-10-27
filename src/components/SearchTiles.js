import React from "react"

export default function SearchTiles(props) {
  const [added, setAdded] = React.useState(
    props.inWatchedList(props.id) || props.inUnwatchedList(props.id)
  )
  const [watched, setWatched] = React.useState(props.inWatchedList(props.id))
  const [thisCast, setThisCast] = React.useState([])
  const BASEURL = "https://api.themoviedb.org/3/"
  const APIKEY = "?api_key=d90c7ae78152fcc5c6bd630628c32793"

  React.useEffect(() => {
    const url = "".concat(BASEURL, "movie/", props.id, "/credits", APIKEY);
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        const cast = [data.cast[0].name, data.cast[1].name, data.cast[2].name];
        console.log("getCredits: " + props.id + ", " + cast);
        setThisCast(cast);
      })
  },[props.id])

  function addToWatchedList() {
    props.addToWatched(
      {
        key: props.id,
        id: props.id,
        poster: props.poster,
        title: props.title,
        date: props.date,
        overview: props.overview,
        cast: thisCast
      }
    )
    setAdded(true)
    setWatched(true)
  }

  function addToUnwatchedList() {
    props.addToUnwatched(
      {
        key: props.id,
        id: props.id,
        poster: props.poster,
        title: props.title,
        date: props.date,
        overview: props.overview,
        cast: thisCast
      }
    )
    setAdded(true)
    setWatched(false)
  }

  return (
    <div className="search-tiles">
      <div className="search-tiles-poster-container">
        <img
          className="search-tiles-poster"
          src={props.poster}
          alt="Poster no longer available in API database 😭"
        />
      </div>

      <div className="search-tiles-info">
        <div className="search-tiles-header">
          <h1 className="search-tiles-title">{props.title}</h1>
          <h1 className="search-tiles-date">{props.convertDate(props.date)}</h1>
        </div>
        <h5>Starring: {thisCast[0] + ", " + thisCast[1] + ", " + thisCast[2]}</h5>
        <p className="search-tiles-overview">{props.overview}</p>
      </div>

      {added
        ? <div>
            <h1 className="search-tiles-watched">✔️ Added to {watched ? "Watched" : "Unwatched"} List</h1>
          </div>
        : <div className="search-tiles-buttons-container">
            <button
              className="search-tiles-buttons watched"
              onClick={addToWatchedList}
            >
              + Add to Watched List
            </button>
            <button
              className="search-tiles-buttons unwatched"
              onClick={addToUnwatchedList}
            >
              + Add to Unwatched List
            </button>
          </div>
      }
    </div>
  )
}