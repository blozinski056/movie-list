import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Watched from "./components/Watched.js";
import Unwatched from "./components/Unwatched.js";
import Tiles from "./components/Tiles.js";
import SearchModal from "./components/SearchModal.js";
import SearchTiles from "./components/SearchTiles.js";
import DetailModal from "./components/DetailModal.js";
import MenuModal from "./components/MenuModal.js";
import FriendsMenu from "./components/FriendsMenu.js";
import FriendTiles from "./components/FriendTiles.js";
import { nanoid } from "nanoid";

export default function App() {
  const [configURL, setConfigURL] = React.useState("");
  const [modal, setModal] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [searchList, setSearchList] = React.useState([]);

  // Get poster url configuration
  React.useEffect(() => {
    fetch("http://localhost:5000/api/TMDB_API/config")
      .then((res) => res.json())
      .then((data) => {
        setConfigURL(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Get search data based on search word
  React.useEffect(() => {
    if (search.length > 0) {
      fetch(`http://localhost:5000/api/TMDB_API/search/${search}`)
        .then((result) => result.json())
        .then((data) => {
          const searchItems = [];
          data.forEach((item) => {
            if (item.overview === "") {
              return;
            }
            // Get poster path url
            const posterPath =
              item.poster_path === null
                ? ""
                : "".concat(configURL, item.poster_path);
            // Create movie object
            const movieObj = {
              key: item.id,
              id: item.id,
              poster: posterPath,
              title: item.title,
              date: item.release_date,
              overview: item.overview,
            };

            // searchItems.push(movieObj);

            searchItems.push(
              <SearchTiles
                key={item.id}
                movie={movieObj}
                addToWatched={addToWatched}
                addToUnwatched={addToUnwatched}
                inWatchedList={inWatchedList}
                inUnwatchedList={inUnwatchedList}
                convertDate={convertDate}
              />
            );
          });
          setSearchList(searchItems);
        })
        .catch((error) => console.log(error));
    }
  }, [search, modal, configURL]);

  // Movie lists
  const [watched, setWatched] = React.useState([]);
  const [unwatched, setUnwatched] = React.useState([]);
  // If modal is visible
  const [menuOn, setMenuOn] = React.useState(false);
  const [friendsMenu, setFriendsMenu] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  // Search keyword
  const [details, setDetails] = React.useState({
    id: "",
    poster: "",
    title: "",
    date: "",
    overview: "",
  });
  const [friendsTilesList, setFriendsTilesList] = React.useState([]);

  // const searchList = searchList.map((movie) => {
  //   return (
  //     <SearchTiles
  //       key={movie.id}
  //       movie={movie}
  //       addToWatched={addToWatched}
  //       addToUnwatched={addToUnwatched}
  //       inWatchedList={inWatchedList}
  //       inUnwatchedList={inUnwatchedList}
  //       convertDate={convertDate}
  //     />
  //   );
  // });

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
        setModal={setModal}
        setDetails={setDetails}
      />
    );
  });

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
        setModal={setModal}
        setDetails={setDetails}
      />
    );
  });

  // Adds movie object to watch list (used in SearchTiles.js)
  function addToWatched(movie) {
    setWatched((prevWatched) => [movie, ...prevWatched]);
  }

  // Add movie object to unwatched list (used in SearchTiles.js)
  function addToUnwatched(movie) {
    setUnwatched((prevUnwatched) => [movie, ...prevUnwatched]);
  }

  function removeFromWatched(id) {
    let index = 0;
    for (let i = 0; i < watched.length; i++) {
      if (watched[i].id === id) {
        index = i;
        break;
      }
    }

    setWatched((prevWatched) => [
      ...prevWatched.slice(0, index),
      ...prevWatched.slice(index + 1, watched.length),
    ]);
  }

  function removeFromUnwatched(id) {
    let index = 0;
    for (let i = 0; i < unwatched.length; i++) {
      if (unwatched[i].id === id) {
        index = i;
        break;
      }
    }

    setUnwatched((prevUnwatched) => [
      ...prevUnwatched.slice(0, index),
      ...prevUnwatched.slice(index + 1, unwatched.length),
    ]);
  }

  function inWatchedList(id) {
    for (let i = 0; i < watched.length; i++) {
      if (id === watched[i].id) {
        return true;
      }
    }
    return false;
  }

  function inUnwatchedList(id) {
    for (let i = 0; i < unwatched.length; i++) {
      if (id === unwatched[i].id) {
        return true;
      }
    }
    return false;
  }

  function getWatchedLength() {
    return watched.length;
  }

  function getUnwatchedLength() {
    return unwatched.length;
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
        month = "";
    }
    return month === ""
      ? "*No date found in API database*"
      : month + " " + day + ", " + year;
  }

  // WITH DATABASE:
  // - render new page to search other profiles
  // - add profile to list
  // function addFriend(pp, un, wc, uc, pURL) {
  //   let newFriend = {
  //     profilePic: pp,
  //     username: un,
  //     watchedCount: wc,
  //     unwatchedCount: uc,
  //     profileURL: pURL
  //   }
  //   setFriendsTilesList(prevList => [newFriend, ...prevList]);
  // }

  // WITHOUT DATABASE:
  // - just add tiles with my picture
  function addFriend() {
    let id = nanoid();
    setFriendsTilesList((prevTiles) => [
      <FriendTiles
        key={id}
        id={id}
        profilePic={"./images/profile-picture.JPG"}
        username={"blozinski056"}
        watchedCount={235}
        unwatchedCount={132}
        profileURL={""}
        removeFriend={removeFriend}
      />,
      ...prevTiles,
    ]);
  }

  function removeFriend(id) {
    let newList = [];
    friendsTilesList.forEach((tile) => {
      if (tile.id === id) {
        return;
      } else {
        newList.push(tile);
      }
    });
    setFriendsTilesList(newList);
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar
        setSearch={setSearch}
        setModal={setModal}
        setMenuOn={setMenuOn}
        signedIn={signedIn}
        setFriendsMenu={setFriendsMenu}
      />

      {menuOn && (
        <MenuModal
          setMenuOn={setMenuOn}
          getWatchedLength={getWatchedLength}
          getUnwatchedLength={getUnwatchedLength}
          addToUnwatched={addToUnwatched}
          addToWatched={addToWatched}
          inWatchedList={inWatchedList}
          inUnwatchedList={inUnwatchedList}
          signedIn={signedIn}
          setSignedIn={setSignedIn}
        />
      )}

      {friendsMenu && (
        <FriendsMenu
          setFriendsMenu={setFriendsMenu}
          friendsTilesList={friendsTilesList}
          addFriend={addFriend}
        />
      )}

      {/* Searchbar list */}
      {modal === 1 && (
        <SearchModal setModal={setModal} searchList={searchList} />
      )}
      {/* {modal === 1 && (
        <SearchModal setModal={setModal} searchList={searchList} />
      )} */}

      {modal === 2 && (
        <DetailModal
          details={details}
          inUnwatchedList={inUnwatchedList}
          addToWatched={addToWatched}
          removeFromWatched={removeFromWatched}
          removeFromUnwatched={removeFromUnwatched}
          convertDate={convertDate}
          setModal={setModal}
        />
      )}

      {/* Movies seen */}
      <Watched tiles={w} />

      {/* Movies want to see */}
      <Unwatched tiles={uw} />
    </div>
  );
}
