import React from "react";

export default function LoginMenu({
  setMenuOn,
  getWatchedLength,
  getUnwatchedLength,
  addToUnwatched,
  addToWatched,
  inWatchedList,
  inUnwatchedList,
  signedIn,
  setSignedIn,
}) {
  const [wrongCreds, setWrongCreds] = React.useState(false);

  function submit(e) {
    e.preventDefault();
    const un = document.querySelector(".lm-username").value;
    const pw = document.querySelector(".lm-password").value;
    if (un === "admin" && pw === "admin") {
      // if (
      //   !inWatchedList(tokyoDriftMovie.id) &&
      //   !inUnwatchedList(tokyoDriftMovie.id)
      // ) {
      //   // addToWatched(tokyoDriftMovie);
      // }
      // if (!inWatchedList(loganMovie.id) && !inUnwatchedList(loganMovie.id)) {
      //   // addToUnwatched(loganMovie);
      // }
      setMenuOn(false);
      setWrongCreds(false);
      setSignedIn(true);
    } else {
      setWrongCreds(true);
    }
  }

  return (
    <div className="login-menu">
      <div className="lm-info">
        <div className="lm-drop-down"></div>
        <h1>{"Watched: " + getWatchedLength()}</h1>
        <h1>{"Unwatched: " + getUnwatchedLength()}</h1>
        {wrongCreds && (
          <h5 style={{ color: "red" }}>Incorrect username/password!</h5>
        )}
        {!signedIn && (
          <form className="lm-form" onSubmit={submit}>
            <input className="lm-username" placeholder="USERNAME" />
            <input className="lm-password" placeholder="PASSWORD" />
            <input className="lm-login" type="submit" value="Login" />
          </form>
        )}
        {signedIn && (
          <button className="lm-login" onClick={() => setSignedIn(false)}>
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
