import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
//all navbars will have same styling/classname

//https://www.youtube.com/watch?v=17l6AOc8s10 reference for styling

const TopNavBar = () => {
  return (
    <nav>
      <Link to="/" className="title">
        <img src="/github.png" alt="Home" className="home-logo"/>
      </Link>

      <ul>
        <li>
          <Link to="/search" className="navlink">
            Search
          </Link>
        </li>
        <li>
          <Link to="/settings" className="navlink">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavBar;
