require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// USER ROUTES

// create user
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newLogin = await pool.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newLogin.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a user
app.get("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update user's password
app.put("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;
    await pool.query(
      "UPDATE users SET password = $1 WHERE username = $2 AND password = $3",
      [newPassword, username, oldPassword]
    );
    res.json(`${username}'s password was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

// delete user
app.delete("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { password } = req.body;
    await pool.query("DELETE FROM movies WHERE username = $1", [username]);
    await pool.query("DELETE FROM friends WHERE friend1 = $1 OR friend2 = $1", [
      username,
    ]);
    await pool.query(
      "DELETE FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    res.json(`User "${username}" was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

// USER'S MOVIE ROUTES

// add movie
app.post("/api/users/:username/movies", async (req, res) => {
  try {
    const { username } = req.params;
    const { movieid, watched } = req.body;
    const movie = await pool.query(
      "INSERT INTO movies(movieid, username, watched) VALUES($1, $2, $3) RETURNING *",
      [movieid, username, watched]
    );
    res.json(movie.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all movies
app.get("/api/users/:username/movies", async (req, res) => {
  try {
    const { username } = req.params;
    const movies = await pool.query(
      "SELECT * FROM movies WHERE username = $1",
      [username]
    );
    res.json(movies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get movie
app.get("/api/users/:username/movies/:movieid", async (req, res) => {
  try {
    const { username, movieid } = req.params;
    const movie = await pool.query(
      "SELECT * FROM movies WHERE username = $1 AND movieid = $2",
      [username, movieid]
    );
    res.json(movie.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete movie
app.delete("/api/users/:username/movies/:movieid", async (req, res) => {
  try {
    const { username, movieid } = req.params;
    await pool.query(
      "DELETE FROM movies WHERE username = $1 AND movieid = $2",
      [username, movieid]
    );
    res.json(`Movie ID ${movieid} was removed!`);
  } catch (err) {
    console.error(err.message);
  }
});

// FRIENDS ROUTES

// add friend
app.post("/api/users/:username/friends", async (req, res) => {
  try {
    const { username } = req.params;
    const { friendid } = req.body;
    const friend = await pool.query(
      "INSERT INTO friends(friend1, friend2) VALUES($1, $2) RETURNING *",
      [username, friendid]
    );
    res.json(friend.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all friends
app.get("/api/users/:username/friends", async (req, res) => {
  try {
    const { username } = req.params;
    const allFriends = await pool.query(
      "SELECT * FROM friends WHERE friend1 = $1 OR friend2 = $1",
      [username]
    );
    res.json(allFriends.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get friend
app.get("/api/users/:username/friends/:friendid", async (req, res) => {
  try {
    const { username, friendid } = req.params;
    const friend = await pool.query(
      "SELECT * FROM friends WHERE (friend1 = $1 AND friend2 = $2) OR (friend1 = $2 AND friend2 = $1)",
      [username, friendid]
    );
    res.json(friend.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// remove friend
app.delete("/api/users/:username/friends/:friendid", async (req, res) => {
  try {
    const { username, friendid } = req.params;
    await pool.query(
      "DELETE FROM friends WHERE (friend1 = $1 AND friend2 = $2) OR (friend1 = $2 AND friend2 = $1)",
      [friendid, username]
    );
    res.json(`Friend ${friendid} was removed!`);
  } catch (err) {
    console.error(err.message);
  }
});

// EXTERNAL MOVIE API ROUTES

// get poster configuration base link; returns poster base link
app.get("/api/TMDB_API/config", async (req, res) => {
  try {
    const config = await fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${process.env.APIKEY}`
    );
    const jsonData = await config.json();
    const secureBaseUrl = jsonData.images.secure_base_url;
    const size = jsonData.images.poster_sizes[4];
    const posterBaseLink = "".concat(secureBaseUrl, size);
    res.json(posterBaseLink);
  } catch (err) {
    console.error(err.message);
  }
});

// get movies based on keyword; returns list of movie data
app.get("/api/TMDB_API/search/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    const search = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&query=${keyword}`
    );
    const jsonData = await search.json();
    res.json(jsonData.results);
  } catch (err) {
    console.error(err.message);
  }
});

// get movie credits
app.get("/api/TMDB_API/credits/:movieid", async (req, res) => {
  try {
    const { movieid } = req.params;
    const credits = await fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${process.env.APIKEY}`
    );
    const jsonData = await credits.json();
    res.json(jsonData.cast);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
