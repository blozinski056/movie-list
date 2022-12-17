import React from "react";

export default function LoginMenu({
  signedIn,
  setSignedIn,
  setUsername,
  setMenuOn,
  getWatchedLength,
  getUnwatchedLength,
  addToUnwatched,
  addToWatched,
  inWatchedList,
  inUnwatchedList,
}) {
  const [wrongCreds, setWrongCreds] = React.useState(0);

  function login(e) {
    e.preventDefault();

    const incorrect = document.querySelector(".lm-incorrect");
    const un = document.querySelector(".lm-login-username").value;
    const pw = document.querySelector(".lm-login-password").value;

    fetch(`http://localhost:5000/api/users/${un}`)
      .then((res) => res.json())
      .then((data) => {
        if (pw === data.password) {
          setMenuOn(false);
          setWrongCreds(0);
          setUsername(un);
          setSignedIn(1);
        } else {
          incorrect.classList.remove("reveal");
          setTimeout(() => {
            incorrect.classList.add("reveal");
          }, 100);
          setWrongCreds(1);
        }
      })
      .catch(() => {
        incorrect.classList.remove("reveal");
        setTimeout(() => {
          incorrect.classList.add("reveal");
        }, 100);
        setWrongCreds(1);
      });
  }

  function signup(e) {
    e.preventDefault();

    const incorrect = document.querySelector(".lm-incorrect");
    const username = document.querySelector(".lm-signup-username").value;
    const password = document.querySelector(".lm-signup-password").value;
    const passwordConfirm = document.querySelector(
      ".lm-signup-password-confirm"
    ).value;

    if (password === passwordConfirm) {
      const body = { username: username, password: password };
      fetch(`http://localhost:5000/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.duplicate === "duplicate") {
            incorrect.classList.remove("reveal");
            setTimeout(() => {
              incorrect.classList.add("reveal");
            }, 100);
            setWrongCreds(2);
          } else {
            setMenuOn(false);
            setWrongCreds(0);
            setUsername(data.username);
            setSignedIn(1);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      incorrect.classList.remove("reveal");
      setTimeout(() => {
        incorrect.classList.add("reveal");
      }, 100);
      setWrongCreds(3);
    }
  }

  return (
    <div className="login-menu">
      <div className="lm-info">
        <div className="lm-drop-down"></div>
        <h1>{"Watched: " + getWatchedLength()}</h1>
        <h1>{"Unwatched: " + getUnwatchedLength()}</h1>
        <h5 className="lm-incorrect">
          {wrongCreds === 1 && "Incorrect username/password!"}
          {wrongCreds === 2 && "Username already exists!"}
          {wrongCreds === 3 && "Passwords do not match!"}
        </h5>
        {signedIn === 0 && (
          <div className="lm-login-container">
            <form className="lm-login-form" onSubmit={(e) => login(e)}>
              <input
                className="lm-login-username"
                type="text"
                placeholder="USERNAME"
                required
              />
              <input
                className="lm-login-password"
                type="password"
                placeholder="PASSWORD"
                required
              />
              <input className="lm-login-submit" type="submit" value="Log In" />
            </form>
            <h5>OR</h5>
            <button
              className="lm-signup"
              onClick={() => {
                setWrongCreds(0);
                setSignedIn(2);
              }}
            >
              Sign Up
            </button>
          </div>
        )}
        {signedIn === 1 && (
          <button className="lm-logout" onClick={() => setSignedIn(0)}>
            Sign Out
          </button>
        )}
        {signedIn === 2 && (
          <div className="lm-signup-container">
            <form className="lm-signup-form" onSubmit={(e) => signup(e)}>
              <input
                type="text"
                className="lm-signup-username"
                placeholder="USERNAME"
              />
              <input
                type="password"
                className="lm-signup-password"
                placeholder="PASSWORD"
              />
              <input
                type="password"
                className="lm-signup-password-confirm"
                placeholder="CONFIRM PASSWORD"
              />
              <input
                type="submit"
                className="lm-signup-submit"
                value="Sign Up"
              />
            </form>
            <h5>OR</h5>
            <button className="lm-login" onClick={() => setSignedIn(0)}>
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
