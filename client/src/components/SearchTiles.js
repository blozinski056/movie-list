import React from "react";

export default function SearchTiles({
  movie,
  addToWatched,
  addToUnwatched,
  inWatchedList,
  inUnwatchedList,
  convertDate,
}) {
  const [added, setAdded] = React.useState(
    inWatchedList(movie.id) || inUnwatchedList(movie.id)
  );
  const [watched, setWatched] = React.useState(inWatchedList(movie.id));
  const [thisCast, setThisCast] = React.useState([]);

  // Get first three members of cast list
  React.useEffect(() => {
    fetch(`http://localhost:5000/api/TMDB_API/credits/${movie.id}`)
      .then((result) => result.json())
      .then((data) => {
        let castList = "";
        if (data.length > 0) {
          castList += data[0].name;
          let i = 1;
          while (data[i] != null && i < 3) {
            castList += ", " + data[i].name;
            i++;
          }
        }
        castList =
          castList === "" ? "*No cast found in API database*" : castList;
        setThisCast(castList);
      })
      .catch((error) => console.log(error));
  }, [movie.id]);

  function addToWatchedList() {
    addToWatched({ ...movie, cast: thisCast });
    setAdded(true);
    setWatched(true);
  }

  function addToUnwatchedList() {
    addToUnwatched({ ...movie, cast: thisCast });
    setAdded(true);
    setWatched(false);
  }

  return (
    <div className="search-tiles">
      <div className="search-tiles-poster-container">
        <img
          className="search-tiles-poster"
          src={movie.poster}
          alt="Poster no longer available in API database 😭"
        />
      </div>

      <div className="search-tiles-info">
        <div className="search-tiles-header">
          <h1 className="search-tiles-title">{movie.title}</h1>
          <h1 className="search-tiles-date">{convertDate(movie.date)}</h1>
        </div>
        <h5>Starring: {thisCast}</h5>
        <p className="search-tiles-overview">{movie.overview}</p>
      </div>

      {added ? (
        <div>
          <h1 className="search-tiles-watched">
            ✔️ Added to {watched ? "Watched" : "Unwatched"} List
          </h1>
        </div>
      ) : (
        <div className="search-tb-container">
          <button className="search-tb-watched" onClick={addToWatchedList}>
            + Add to Watched List
          </button>
          <button className="search-tb-unwatched" onClick={addToUnwatchedList}>
            + Add to Unwatched List
          </button>
        </div>
      )}
    </div>
  );
}
