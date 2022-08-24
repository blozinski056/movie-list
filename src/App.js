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