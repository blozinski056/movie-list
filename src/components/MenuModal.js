import React from "react"

export default function MenuModal({setMenuOn, getWatchedLength, getUnwatchedLength, tokyoDriftMovie, loganMovie, addToUnwatched, addToWatched, inWatchedList, inUnwatchedList, signedIn, setSignedIn}) {
  const [wrongCreds, setWrongCreds] = React.useState(false)

  function submit(e) {
    e.preventDefault();
    const un = document.querySelector(".mm-username").value;
    const pw = document.querySelector(".mm-password").value;
    // WITH DATABASE:
    // - check credentials in database
    // - check if movies from account are movies currently displayed
    // - when signing out save new movies to database

    // WITHOUT DATABASE:
    // - compare 2 movie variables with movies currently displayed; display if not shown
    if(un === "admin" && pw === "admin") {
      if(!inWatchedList(tokyoDriftMovie.id) && !inUnwatchedList(tokyoDriftMovie.id)) {
        addToWatched(tokyoDriftMovie);
      }
      if(!inWatchedList(loganMovie.id) && !inUnwatchedList(loganMovie.id)) {
        addToUnwatched(loganMovie);
      }
      setMenuOn(false);
      setWrongCreds(false);
      setSignedIn(true);
    } else {
      setWrongCreds(true);
    }
  }

  return (
    <div className="menu-modal">
      <div className="menu-modal-overlay" onClick={() => setMenuOn(false)}></div>
      <div className="menu-modal-info">
        <div className="menu-modal-drop-down"></div>
        <h1>{"Watched: " + getWatchedLength()}</h1>
        <h1>{"Unwatched: " + getUnwatchedLength()}</h1>
        {wrongCreds && <h5 style={{color:"red"}}>Incorrect username/password!</h5>}
        {!signedIn &&
          <form className="mm-form" onSubmit={submit}>
            <input className="mm-username" placeholder="USERNAME" />
            <input className="mm-password" placeholder="PASSWORD" />
            <input className="mm-login" type="submit" value="Login" />
          </form>
        }
        {signedIn &&
          <button className="mm-login" onClick={() => setSignedIn(false)}>Sign Out</button>
        }
      </div>
    </div>
  )
}