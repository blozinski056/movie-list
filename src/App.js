import React from "react"
import "./App.css"
import Navbar from "./components/Navbar.js"
import Watched from "./components/Watched.js"
import Unwatched from "./components/Unwatched.js"

export default function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Movies seen */}
      <Watched />

      {/* Movies want to see */}
      <Unwatched />
    </div>
  );
}