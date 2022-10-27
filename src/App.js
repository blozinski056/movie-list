import React from "react"
import "./App.css"
import Navbar from "./components/Navbar.js"
import Watched from "./components/Watched.js"
import Unwatched from "./components/Unwatched.js"
import Tiles from "./components/Tiles.js"
import SearchModal from "./components/SearchModal.js"
import SearchTiles from "./components/SearchTiles.js"
import DetailModal from "./components/DetailModal.js"

export default function App() {
  // Movie lists
  const [watched, setWatched] = React.useState([])
  const [unwatched, setUnwatched] = React.useState([])
  // If modal is visible
  const [modal, setModal] = React.useState(false)
  // Search keyword
  const [search, setSearch] = React.useState("")
  const [detailModal, setDetailModal] = React.useState(false)
  const [details, setDetails] = React.useState({id: "", poster: "", title: "", date: "", overview: ""})
  // Variables for API fetch
  const BASEURL = "https://api.themoviedb.org/3/"
  const APIKEY = "?api_key=d90c7ae78152fcc5c6bd630628c32793"
  const [searchData, setSearchData] = React.useState([])
  const [configURL, setConfigURL] = React.useState("")

  const searchList = searchData.map((movie) => {
    return (
      <SearchTiles 
        key={movie.id}
        id={movie.id}
        poster={"".concat(configURL, movie.poster)}
        title={movie.title}
        date={movie.date}
        overview={movie.overview}
        addToWatched={addToWatched}
        addToUnwatched={addToUnwatched}
        inWatchedList={inWatchedList}
        inUnwatchedList={inUnwatchedList}
        convertDate={convertDate}
      />
    )
  })

  const w = watched.map((item) => {
    return (
      <Tiles 
        key={item.key}
        id={item.id}
        title={item.title}
        poster={item.poster}
        date={item.date}
        overview={item.overview}
        cast={item.cast}
        setDetailModal={setDetailModal}
        setDetails={setDetails}
      />
    )
  })

  const uw = unwatched.map((item) => {
    return (
      <Tiles 
        key={item.key}
        id={item.id}
        title={item.title}
        poster={item.poster}
        date={item.date}
        overview={item.overview}
        cast={item.cast}
        setDetailModal={setDetailModal}
        setDetails={setDetails}
      />
    )
  })

  React.useEffect(() => {
    const url = "".concat(BASEURL, "configuration", APIKEY);
    fetch(url)
      .then(result => result.json())
      .then((data) => {
        const config = data.images.secure_base_url
        const sizes = data.images.poster_sizes[4]
        const posterLink = "".concat(config, sizes)
        setConfigURL(posterLink)
      })
      .catch((error) => console.log(error));
  }, [])

  // Updating searched items based on search keyword
  React.useEffect(() => {
    if(search.length > 0) {
      const url = "".concat(BASEURL, "search/movie", APIKEY, "&query=", search);
      fetch(url)
      .then((result) => result.json())
      .then((data) => {
        const searchItems = data.results.map((item) => {
          return (
            {
              key: item.id,
              id: item.id,
              poster: item.poster_path,
              title: item.title,
              date: item.release_date,
              overview: item.overview
            }
          )
        })
        setSearchData(searchItems);
      })
    }
  }, [search])

  // Adds movie object to watch list (used in SearchTiles.js)
  function addToWatched(movie) {
    setWatched(prevWatched => [movie, ...prevWatched])
  }

  // Add movie object to unwatched list (used in SearchTiles.js)
  function addToUnwatched(movie) {
    setUnwatched(prevUnwatched => [movie, ...prevUnwatched])
  }

  function removeFromWatched(id) {
    let index = 0;
    for(let i = 0; i < watched.length; i++) {
      if(watched[i].id === id) {
        index = i;
        break;
      }
    }

    setWatched(prevWatched => [
      ...prevWatched.slice(0, index), 
      ...prevWatched.slice(index + 1, watched.length)
    ])
  }

  function removeFromUnwatched(id) {
    let index = 0;
    for(let i = 0; i < unwatched.length; i++) {
      if(unwatched[i].id === id) {
        index = i;
        break;
      }
    }

    setUnwatched(prevUnwatched => [
      ...prevUnwatched.slice(0, index), 
      ...prevUnwatched.slice(index + 1, unwatched.length)
    ])
  }

  function inWatchedList(id) {
    for(let i = 0; i < watched.length; i++) {
      if(id === watched[i].id) {
        return true
      }
    }
    return false
  }

  function inUnwatchedList(id) {
    for(let i = 0; i < unwatched.length; i++) {
      if(id === unwatched[i].id) {
        return true
      }
    }
    return false
  }

  function getWatchedLength() {
    return watched.length
  }

  function getUnwatchedLength() {
    return unwatched.length
  }

  function convertDate(date) {
    let year = date.substring(0, 4);
    let day = date.substring(8);
    let month;
    switch (date.substring(5, 7)) {
      case "01":
        month = "Jan";
        break;
      case "02":
        month = "Feb";
        break;
      case "03":
        month = "Mar";
        break;
      case "04":
        month = "Apr";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "Jun";
        break;
      case "07":
        month = "Jul";
        break;
      case "08":
        month = "Aug";
        break;
      case "09":
        month = "Sep";
        break;
      case "10":
        month = "Oct";
        break;
      case "11":
        month = "Nov";
        break;
      case "12":
        month = "Dec";
        break;
      default:
        month = "Jan";
    }
    return month + " " + day + ", " + year;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar 
        setSearch={setSearch}
        setModal={setModal}
        setDetailModal={setDetailModal}
        watchedLength={getWatchedLength}
        unwatchedLength={getUnwatchedLength}
      />

      {/* Searchbar list */}
      {(modal && search.length > 0) &&
        <SearchModal 
          setModal={setModal}
          searchList={searchList}
        />
      }

      {/* Movies seen */}
      <Watched 
        tiles={w}
      />

      {/* Movies want to see */}
      <Unwatched 
        tiles={uw}
      />

      {detailModal &&
        <DetailModal 
          id={details.id}
          poster={details.poster}
          title={details.title}
          date={details.date}
          overview={details.overview}
          cast={details.cast}
          inWatchedList={inWatchedList}
          inUnwatchedList={inUnwatchedList}
          addToWatched={addToWatched}
          addToUnwatched={addToUnwatched}
          removeFromWatched={removeFromWatched}
          removeFromUnwatched={removeFromUnwatched}
          convertDate={convertDate}
          setDetailModal={setDetailModal}
        />
      }
    </div>
  )
}