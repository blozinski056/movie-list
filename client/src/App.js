import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Watched from "./components/Watched.js";
import Unwatched from "./components/Unwatched.js";
import Tiles from "./components/Tiles.js";
import SearchModal from "./components/SearchModal.js";
import SearchTiles from "./components/SearchTiles.js";
import DetailModal from "./components/DetailModal.js";
import LoginMenu from "./components/LoginMenu.js";
// import FriendsMenu from "./components/FriendsMenu.js";
// import FriendTiles from "./components/FriendTiles.js";
import { nanoid } from "nanoid";

export default function App() {
  const [configURL, setConfigURL] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [modal, setModal] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [searchList, setSearchList] = React.useState([]);
  const [details, setDetails] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [menuOn, setMenuOn] = React.useState(false);
  // const [friendsMenu, setFriendsMenu] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(0);
  // Movie lists
  const [watched, setWatched] = React.useState([]);
  const [unwatched, setUnwatched] = React.useState([]);
  const w = watched.map((movie) => {
    return (
      <Tiles
        key={movie.key}
        movie={movie}
        setModal={setModal}
        setDetails={setDetails}
      />
    );
  });

  const uw = unwatched.map((movie) => {
    return (
      <Tiles
        key={movie.key}
        movie={movie}
        setModal={setModal}
        setDetails={setDetails}
      />
    );
  });

  const searchTiles = searchList.map((movie) => {
    return (
      <SearchTiles
        key={movie.id}
        movie={movie}
        addToWatched={addToWatched}
        addToUnwatched={addToUnwatched}
        inWatchedList={inWatchedList}
        inUnwatchedList={inUnwatchedList}
        convertDate={convertDate}
      />
    );
  });

  React.useEffect(() => {
    const wData = JSON.parse(window.localStorage.getItem("watched"));
    const uwData = JSON.parse(window.localStorage.getItem("unwatched"));
    const unData = JSON.parse(window.localStorage.getItem("username"));
    const siData = JSON.parse(window.localStorage.getItem("signedIn"));

    if (wData !== null) {
      setWatched(wData);
    }
    if (uwData !== null) {
      setUnwatched(uwData);
    }
    if (unData !== null) {
      setUsername(unData);
    }
    if (siData !== null) {
      setSignedIn(siData);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  React.useEffect(() => {
    window.localStorage.setItem("unwatched", JSON.stringify(unwatched));
  }, [unwatched]);

  React.useEffect(() => {
    window.localStorage.setItem("username", JSON.stringify(username));
  }, [username]);

  React.useEffect(() => {
    window.localStorage.setItem("signedIn", JSON.stringify(signedIn));
    if (signedIn === 0) {
      window.localStorage.setItem("username", JSON.stringify(null));
      setWatched([]);
      setUnwatched([]);
    }
  }, [signedIn]);

  // Get poster url configuration
  React.useEffect(() => {
    fetch("https://movie-list-bloz.herokuapp.com/api/TMDB_API/config")
      .then((res) => res.json())
      .then((data) => {
        setConfigURL(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Get search data based on search word
  React.useEffect(() => {
    if (search.length > 0) {
      setReady(false);
      fetch(
        `https://movie-list-bloz.herokuapp.com/api/TMDB_API/search/${search}`
      )
        .then((result) => result.json())
        .then((data) => {
          const searchItems = [];
          data.forEach((item) => {
            if (item.overview === "") {
              return;
            }
            const id = item.hasOwnProperty("id") ? item.id : nanoid();
            const posterPath =
              item.hasOwnProperty("poster_path") && item.poster_path !== null
                ? "".concat(configURL, item.poster_path)
                : "";
            const title = item.hasOwnProperty("title") ? item.title : "";
            const releaseDate =
              item.hasOwnProperty("release_date") && item.release_date !== null
                ? item.release_date
                : "";
            const overview = item.hasOwnProperty("overview")
              ? item.overview
              : "";
            // Create movie object
            const movieObj = {
              key: id,
              id: id,
              poster: posterPath,
              title: title,
              date: releaseDate,
              overview: overview,
            };

            searchItems.push(movieObj);
          });
          setSearchList(searchItems);
          setReady(true);
        })
        .catch((error) => console.log(error));
    }
  }, [search, modal, configURL]);

  // Sync movie list from DB with client
  async function syncMovies(username) {
    const wLength = getWatchedLength();
    const uwLength = getUnwatchedLength();

    // DB -> client
    try {
      const res = await fetch(
        `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies`
      );
      const jsonData = await res.json();
      const addWatched = [];
      const addUnwatched = [];
      // checks if the user has movies in their db
      if ((await jsonData.length) !== 0) {
        for await (const movie of jsonData) {
          // checks if movie was not on client already
          if (!inWatchedList(movie.id) && !inUnwatchedList(movie.id)) {
            // if movie was not on client
            if (movie.watched) {
              addWatched.push({
                key: movie.id,
                id: movie.id,
                poster: movie.poster,
                title: movie.title,
                date: movie.date,
                overview: movie.overview,
                cast: movie.moviecast,
              });
            } else {
              addUnwatched.push({
                key: movie.id,
                id: movie.id,
                poster: movie.poster,
                title: movie.title,
                date: movie.date,
                overview: movie.overview,
                cast: movie.moviecast,
              });
            }
          } else if (inWatchedList(movie.id) || inUnwatchedList(movie.id)) {
            // remove from database
            await fetch(
              `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies/${movie.id}`,
              {
                method: "DELETE",
              }
            ).catch((err) => console.error(err.message));
          }
        }

        setWatched((prevWatched) => [...prevWatched, ...addWatched]);
        setUnwatched((prevUnwatched) => [...prevUnwatched, ...addUnwatched]);
      }
    } catch (err) {
      console.error(err.message);
    }

    // client (watched) -> DB
    for (let i = 0; i < wLength; i++) {
      // add movies from client to database
      const body = {
        id: watched[i].id,
        poster: watched[i].poster,
        title: watched[i].title,
        date: watched[i].date,
        overview: watched[i].overview,
        moviecast: watched[i].cast,
        watched: true,
      };

      await fetch(
        `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).catch((err) => console.error(err.message));
    }

    // client (unwatched) -> DB
    for (let j = 0; j < uwLength; j++) {
      // add movies from client to database
      const body = {
        id: unwatched[j].id,
        poster: unwatched[j].poster,
        title: unwatched[j].title,
        date: unwatched[j].date,
        overview: unwatched[j].overview,
        moviecast: unwatched[j].cast,
        watched: false,
      };

      await fetch(
        `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).catch((err) => console.error(err.message));
    }
  }

  // Adds movie object to watch list (used in SearchTiles.js)
  async function addToWatched(movie) {
    setWatched((prevWatched) => [movie, ...prevWatched]);

    if (signedIn) {
      const body = {
        id: movie.id,
        poster: movie.poster,
        title: movie.title,
        date: movie.date,
        overview: movie.overview,
        moviecast: movie.cast,
        watched: true,
      };

      await fetch(
        `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).catch((err) => console.error(err.message));
    }
  }

  // Add movie object to unwatched list (used in SearchTiles.js)
  async function addToUnwatched(movie) {
    setUnwatched((prevUnwatched) => [movie, ...prevUnwatched]);

    if (signedIn) {
      const body = {
        id: movie.id,
        poster: movie.poster,
        title: movie.title,
        date: movie.date,
        overview: movie.overview,
        moviecast: movie.cast,
        watched: false,
      };

      await fetch(
        `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).catch((err) => console.error(err.message));
    }
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

  async function removeFromWatched(id) {
    const newList = [];
    watched.forEach((movie) => {
      if (movie.id !== id) {
        newList.push(movie);
      }
    });
    setWatched(newList);

    if (signedIn) {
      await fetch(
        `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies/${id}`,
        {
          method: "DELETE",
        }
      ).catch((err) => console.error(err.message));
    }
  }

  async function removeFromUnwatched(id) {
    const newList = [];
    unwatched.forEach((movie) => {
      if (movie.id !== id) {
        newList.push(movie);
      }
    });
    setUnwatched(newList);

    if (signedIn) {
      await fetch(
        `https://movie-list-bloz.herokuapp.com/api/users/${username}/movies/${id}`,
        {
          method: "DELETE",
        }
      ).catch((err) => console.error(err.message));
    }
  }

  function getWatchedLength() {
    return watched.length;
  }

  function getUnwatchedLength() {
    return unwatched.length;
  }

  function convertDate(date) {
    if (date === "" || date === null) {
      return "*No date found in API database*";
    }
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

  // Search keyword
  // const [friendsTilesList, setFriendsTilesList] = React.useState([]);

  // function addFriend() {
  //   let id = nanoid();
  //   setFriendsTilesList((prevTiles) => [
  //     <FriendTiles
  //       key={id}
  //       id={id}
  //       profilePic={"./images/profile-picture.JPG"}
  //       username={"blozinski056"}
  //       watchedCount={235}
  //       unwatchedCount={132}
  //       profileURL={""}
  //       removeFriend={removeFriend}
  //     />,
  //     ...prevTiles,
  //   ]);
  // }

  // function removeFriend(id) {
  //   let newList = [];
  //   friendsTilesList.forEach((tile) => {
  //     if (tile.id === id) {
  //       return;
  //     } else {
  //       newList.push(tile);
  //     }
  //   });
  //   setFriendsTilesList(newList);
  // }

  return (
    <>
      {/* Navbar */}
      <Navbar
        username={username}
        setSearch={setSearch}
        setModal={setModal}
        setMenuOn={setMenuOn}
        signedIn={signedIn}
        // setFriendsMenu={setFriendsMenu}
      />

      {/* Modal overlay */}
      {modal !== 0 && (
        <div className="modal-overlay" onClick={() => setModal(0)}></div>
      )}

      {/* Searchbar list */}
      {modal === 1 && ready && <SearchModal searchTiles={searchTiles} />}

      {/* Movie details */}
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

      {/* Movies haven't seen */}
      <Unwatched tiles={uw} />

      {menuOn && (
        <LoginMenu
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          username={username}
          setUsername={setUsername}
          syncMovies={syncMovies}
          setMenuOn={setMenuOn}
          getWatchedLength={getWatchedLength}
          getUnwatchedLength={getUnwatchedLength}
        />
      )}

      {/* {friendsMenu && (
        <FriendsMenu
          setFriendsMenu={setFriendsMenu}
          friendsTilesList={friendsTilesList}
          addFriend={addFriend}
        />
      )} */}
    </>
  );
}
