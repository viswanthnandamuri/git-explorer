import React from "react";
import "./styles.css";
import { Outlet, Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <Link to={"/"}>Git Explorer</Link>
        <div className="link-cont">
          <Link to={"/"}>Home</Link>
          <Link to={"/users"}>Users</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
};

export default Navbar;
