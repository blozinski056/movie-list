require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});