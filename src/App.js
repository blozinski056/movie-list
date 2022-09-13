import React from "react"
import "./App.css"
import Navbar from "./components/Navbar.js"
import Watched from "./components/Watched.js"
import Unwatched from "./components/Unwatched.js"
import Tiles from "./components/Tiles.js"
import SearchModal from "./components/SearchModal.js"
import SearchTiles from "./components/SearchTiles.js"

export default function App() {
  // Movie lists
  const [watched, setWatched] = React.useState([])
  const [unwatched, setUnwatched] = React.useState([])

  // If modal is visible
  const [modal, setModal] = React.useState(false)

  // Search keyword
  const [search, setSearch] = React.useState("")

  // Variables for API fetch
  const BASEURL = "https://api.themoviedb.org/3/"
  const APIKEY = "?api_key=d90c7ae78152fcc5c6bd630628c32793"
  const [searchData, setSearchData] = React.useState([])
  const [configURL, setConfigURL] = React.useState("")

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

        setSearchData(searchItems)
      })
    }
  }, [search])

  // Gets image configuration URL
  function getConfig() {
    const url = "".concat(BASEURL, "configuration", APIKEY);

    return(
      fetch(url)
      .then(result => result.json())
      .then((data) => {
        const config = data.images.secure_base_url
        const sizes = data.images.poster_sizes[4]
        const posterLink = "".concat(config, sizes)
        setConfigURL(posterLink)
      })
      .catch((error) => console.log(error))
    )
  }

  // Makes search tiles based on keyword
  function makeSearchTiles() {
    getConfig()

    return (
      searchData.map((movie) => {
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
          />
        )
      })
    )
  }

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

  const w = watched.map((item) => {
    return (
      <Tiles 
        key={item.key}
        id={item.id}
        title={item.title}
        poster={item.poster}
        date={item.date}
        overview={item.overview}
        inWatchedList={inWatchedList}
        inUnwatchedList={inUnwatchedList}
        addToWatched={addToWatched}
        addToUnwatched={addToUnwatched}
        removeFromWatched={removeFromWatched}
        removeFromUnwatched={removeFromUnwatched}
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
        inWatchedList={inWatchedList}
        inUnwatchedList={inUnwatchedList}
        addToWatched={addToWatched}
        addToUnwatched={addToUnwatched}
        removeFromWatched={removeFromWatched}
        removeFromUnwatched={removeFromUnwatched}
      />
    )
  })

  return (
    <div>
      {/* Navbar */}
      <Navbar 
        setSearch={setSearch}
        setModal={setModal}
      />

      {/* Searchbar list */}
      {(modal && search.length > 0) &&
        <SearchModal 
          setModal={setModal}
          makeSearchTiles={makeSearchTiles}
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
    </div>
  )
}