import React from "react";

export default function SearchModal({ setModal, searchList }) {
  return (
    <div className="search-modal">
      <div className="modal-list">
        {searchList.length > 0 ? searchList : <h1>No movies found!</h1>}
      </div>
      <div className="modal-drop-down"></div>
    </div>
  );
}
