import React from "react"
import "./App.css"
import Navbar from "./components/Navbar.js"
import Watched from "./components/Watched.js"
import Unwatched from "./components/Unwatched.js"
import Tiles from "./components/Tiles.js"
import Modal from "./components/Modal.js"

export default function App() {
  const [modal, setModal] = React.useState(false)
  const [watched, setWatched] = React.useState([])
  const [unwatched, setUnwatched] = React.useState([])
  const [search, setSearch] = React.useState("")

  const BASEURL = "https://api.themoviedb.org/3/"
  const APIKEY = "?api_key=d90c7ae78152fcc5c6bd630628c32793"

  const w = watched.map((item) => {
    return (
      <Tiles 
        key={item.id}
        title={item.title}
        poster={item.poster}
        year={item.year}
        description={item.description}
      />
    )
  })

  const uw = unwatched.map((item) => {
    return (
      <Tiles 
        key={item.id}
        title={item.title}
        poster={item.poster}
        year={item.year}
        overview={item.overview}
      />
    )
  })

  function createWatched(movieID) {
    
  }

  function createUnwatched(movieID) {

  }

  // s: searched keyword
  // RETURN: list of data of movies based on keyword
  function searchData() {
    const url = "".concat(BASEURL, "search/movie", APIKEY, "&query=", search);
    return (
      fetch(url)
        .then(result => result.json())
        .then((data) => {
          console.log(data.results)
          return data.results
        })

        // NOT WORKING TO SEND RESULTS PROPERLY
    )
  }

  console.log(searchData(search))

  // posterPath: URL of movie's poster picture
  // size: integer between 0 and poster_sizes.length
  // RETURN: complete URL for movie poster
  function getImage(posterPath, size) {
    let config = "";
    let sizes = [];
    const url = "".concat(BASEURL, "configuration", APIKEY);

    fetch(url)
      .then(result => result.json())
      .then((data) => {
        config = data.images.secure_base_url
        sizes = data.images.poster_sizes
      })

    return "".concat(config, sizes[size], posterPath)
  }

  console.log("state: " + search)

  return (
    <div>
      {/* Navbar */}
      <Navbar 
        search={setSearch}
        modal={setModal}
      />

      {/* Search bar list */}
      {modal && 
        <Modal 
          close={setModal}
          searchData={searchData}
          getImage={getImage}
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