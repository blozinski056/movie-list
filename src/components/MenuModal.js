import React from "react"

export default function MenuModal(props) {
  const [wrongCreds, setWrongCreds] = React.useState(false)
  const [signedIn, setSignedIn] = React.useState(false)

  function submit(e) {
    e.preventDefault();
    const un = document.querySelector(".mm-username").value;
    const pw = document.querySelector(".mm-password").value;
    // with database: check credentials against data
    if(un === "admin" && pw === "admin") {
      // with database: check if movies are already on the list
      if(!props.inWatchedList(props.tokyoDriftMovie.id) && !props.inUnwatchedList(props.tokyoDriftMovie.id)) {
        props.addToWatched(props.tokyoDriftMovie);
      }
      if(!props.inWatchedList(props.loganMovie.id) && !props.inUnwatchedList(props.loganMovie.id)) {
        props.addToUnwatched(props.loganMovie);
      }
      props.setMenuOn(false);
      setWrongCreds(false);
      setSignedIn(true);
    } else {
      setWrongCreds(true);
    }
  }

  return (
    <div className="menu-modal">
      <div className="menu-modal-overlay" onClick={() => props.setMenuOn(false)}></div>
      <div className="menu-modal-info">
        <div className="menu-modal-drop-down"></div>
        <h1>{"Watched: " + props.watchedLength()}</h1>
        <h1>{"Unwatched: " + props.unwatchedLength()}</h1>
        {wrongCreds && <h5>Incorrect username/password!</h5>}
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