import React from "react"

export default function Modal(props) {

  // console.log(props.searchData())
  const results = props.searchData().map((data) => {
    return (
      <div className="modal-data">
        <img src={props.getImage(data.poster_path)} alt={data.title} />
        <div className="modal-data-info">
          <h1>{data.title} + {" ("} + {data.release_date} + {")"}</h1>
          <p>{data.overview}</p>
        </div>
        <div className="modal-data-buttons">
          <button >+ Add to Watched List</button>
          <button>+ Add to Unwatched List</button>
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="modal-overlay"></div>

      <div className="modal">
        {/* {results} */}
      </div>
    </div>
    
  )
}