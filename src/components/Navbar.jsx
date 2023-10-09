import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";

function Navbar() {
  return (
    <>
      <nav>
        <div className="d-flex">
          <p className="flex-grow-1 fw-bold"> Hackflix </p>
          <a href="/">Home</a>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
