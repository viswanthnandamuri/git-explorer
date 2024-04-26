import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <h1>Page Not found</h1>
      <Link to={"/"}>Take Back to home</Link>
    </div>
  );
};

export default Notfound;
