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

  console.log("App search state: " + search)
  console.log("App modal state: " + modal)

  const w = watched.map((item) => {
    return (
      <Tiles 
        key={item.key}
        title={item.title}
        poster={item.poster}
        date={item.date}
        overview={item.overview}
      />
    )
  })

  const uw = unwatched.map((item) => {
    return (
      <Tiles 
        key={item.key}
        title={item.title}
        poster={item.poster}
        date={item.date}
        overview={item.overview}
      />
    )
  })

  function addToWatched(movie) {
    setWatched(prevWatched => [movie, ...prevWatched])
  }

  function addToUnwatched(movie) {
    setUnwatched(prevUnwatched => [movie, ...prevUnwatched])
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar 
        setSearch={setSearch}
        setModal={setModal}
      />

      {/* Searchbar list */}
      {modal && search.length > 0 &&
        <Modal 
          setModal={setModal}
          search={search}
          addToWatched={addToWatched}
          addToUnwatched={addToUnwatched}
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