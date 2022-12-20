import React from "react";

export default function SearchModal({ searchTiles }) {
  return (
    <div className="search-modal">
      <div className="modal-list">
        {searchTiles.length > 0 ? searchTiles : <h1>No movies found!</h1>}
      </div>
      <div className="modal-drop-down"></div>
    </div>
  );
}
