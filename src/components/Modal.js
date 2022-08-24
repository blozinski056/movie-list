import React from "react"
import SearchTiles from "./SearchTiles.js"

export default function Modal(props) {
  const BASEURL = "https://api.themoviedb.org/3/"
  const APIKEY = "?api_key=d90c7ae78152fcc5c6bd630628c32793"
  const [movieData, setMovieData] = React.useState([])
  const [configURL, setConfigURL] = React.useState("")

  console.log(movieData)
  
  // Returns base link of image configuration
  function getImage() {
    const url = "".concat(BASEURL, "configuration", APIKEY);

    return(
      fetch(url)
      .then(result => result.json())
      .then((data) => {
        const config = data.images.secure_base_url
        const sizes = data.images.poster_sizes[1]
        const posterLink = "".concat(config, sizes)
        setConfigURL(posterLink)
      })
      .catch((error) => console.log(error))
    )
  }

  // Generates links for each poster first, then returns tile for each movie
  function makeTiles() {
    getImage()

    return (
      movieData.map((movie) => {    
        return (
          <SearchTiles 
            key={movie.key}
            poster={"".concat(configURL, movie.poster)}
            title={movie.title}
            date={movie.date}
            overview={movie.overview}
          />
        )
      })
    )
  }

  React.useEffect(() => {
    // Retrieves all movie data on Modal load
    if(props.search.length > 0) {
      const url = "".concat(BASEURL, "search/movie", APIKEY, "&query=", props.search);
  
      fetch(url)
      .then((result) => result.json())
      // .then((data) => setMovieData(data.results))
      .then((data) => {
        const searchItems = data.results.map((item) => {
          return (
            {
              key: item.id,
              poster: item.poster_path,
              title: item.title,
              date: item.release_date,
              overview: item.overview
            }
          )
        })

        setMovieData(searchItems)
      })
    }
  }, [props.search])
  
  return (
    <div className="modal">
      <div className="modal-overlay" onClick={() => props.setModal(false)}></div>

      <div className="modal-list">
        {makeTiles()}
      </div>
    </div>
  )
}