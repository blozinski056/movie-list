import React from "react";

export default function LoginMenu({
  signedIn,
  setSignedIn,
  username,
  setUsername,
  syncMovies,
  setMenuOn,
  getWatchedLength,
  getUnwatchedLength,
}) {
  const [wrongCreds, setWrongCreds] = React.useState(0);
  const [showForms, setShowForms] = React.useState(0);

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
          setUsername(un);
          syncMovies(un);
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
            syncMovies(data.username);
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

  function changePW(e) {
    e.preventDefault();

    const oldPW = document.querySelector(".change-old-pw").value;
    const newPW = document.querySelector(".change-new-pw").value;
    const incorrect = document.querySelector(".lm-change-incorrect");

    // check correct password
    fetch(`http://localhost:5000/api/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        // check if password is correct
        if (data.password !== oldPW) {
          // if password is wrong
          incorrect.classList.remove("reveal");
          setTimeout(() => {
            incorrect.classList.add("reveal");
          }, 100);
          setWrongCreds(4);
        } else {
          // if password is correct, check if passwords are the same
          if (oldPW === newPW) {
            // if passwords are the same, show incorrect
            incorrect.classList.remove("reveal");
            setTimeout(() => {
              incorrect.classList.add("reveal");
            }, 100);
            setWrongCreds(5);
          } else {
            // if passwords are different, change password
            const body = { oldPassword: oldPW, newPassword: newPW };
            fetch(`http://localhost:5000/api/users/${username}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
              .then((res) => res.json())
              .then((data) => {
                const formElm = document.querySelector(".lm-change-pw-form");
                // remove elements change password form
                while (formElm.firstChild) {
                  formElm.removeChild(formElm.firstChild);
                }
                // create and add new element to form
                const formElmMessage = document.createElement("h1");
                formElmMessage.innerText = data;
                formElmMessage.style.textAlign = "center";
                formElm.appendChild(formElmMessage);
                formElmMessage.classList.add("display");

                setTimeout(() => {
                  setShowForms(0);
                }, 2000);
              })
              .catch((err) => console.error(err.message));
          }
        }
      });
  }

  function deleteAccount(e) {
    e.preventDefault();

    const pw = document.querySelector(".delete-pw").value;
    const incorrect = document.querySelector(".lm-delete-incorrect");

    fetch(`http://localhost:5000/api/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        // check if password is correct
        if (data.password === pw) {
          // if password is correct, then delete
          const body = { password: data.password };
          fetch(`http://localhost:5000/api/users/${username}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((data) => {
              // display that user was deleted
              const formElm = document.querySelector(".lm-delete-account-form");
              // remove elements change password form
              while (formElm.firstChild) {
                formElm.removeChild(formElm.firstChild);
              }
              // create and add new element to form
              const formElmMessage = document.createElement("h1");
              formElmMessage.innerText = data;
              formElmMessage.style.textAlign = "center";
              formElm.appendChild(formElmMessage);
              formElmMessage.classList.add("display");

              setTimeout(() => {
                setMenuOn(false);
                setUsername("");
                setSignedIn(0);
                setShowForms(0);
              }, 2000);
            })
            .catch((err) => console.error(err.message));
        } else {
          // if password is incorrect, reveal incorrect
          incorrect.classList.remove("reveal");
          setTimeout(() => {
            incorrect.classList.add("reveal");
          }, 100);
          setWrongCreds(6);
        }
      });
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
              <button className="lm-login-submit" type="submit">
                Log In
              </button>
            </form>
            <h5>OR</h5>
            <button className="lm-signup" onClick={() => setSignedIn(2)}>
              Sign Up
            </button>
          </div>
        )}
        {signedIn === 1 && (
          <div className="lm-signout-container">
            <button className="lm-signout" onClick={() => setSignedIn(0)}>
              Sign Out
            </button>
            {showForms !== 1 && (
              <button className="lm-change-pw" onClick={() => setShowForms(1)}>
                Change Password
              </button>
            )}
            {showForms === 1 && (
              <form className="lm-change-pw-form" onSubmit={(e) => changePW(e)}>
                <h1>CHANGE PASSWORD</h1>
                <h5 className="lm-change-incorrect">
                  {wrongCreds === 4 && "Wrong password!"}
                  {wrongCreds === 5 && "Cannot use the same password!"}
                </h5>
                <input
                  type="password"
                  className="change-old-pw"
                  placeholder="Old Password"
                />
                <input
                  type="password"
                  className="change-new-pw"
                  placeholder="New Password"
                />
                <button type="submit" className="change-submit">
                  Change
                </button>
              </form>
            )}
            {showForms !== 2 && (
              <button
                className="lm-delete-account"
                onClick={() => setShowForms(2)}
              >
                Delete Account
              </button>
            )}
            {showForms === 2 && (
              <form
                className="lm-delete-account-form"
                onSubmit={(e) => deleteAccount(e)}
              >
                <h1>DELETE ACCOUNT</h1>
                <h5 className="lm-delete-incorrect">
                  {wrongCreds === 6 && "Wrong password!"}
                </h5>
                <input
                  type="password"
                  className="delete-pw"
                  placeholder="Password"
                />
                <button className="delete-submit">Delete</button>
              </form>
            )}
          </div>
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
              <button type="submit" className="lm-signup-submit">
                Sign Up
              </button>
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
