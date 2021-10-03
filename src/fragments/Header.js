import React from "react";
import { Link } from "react-router-dom";

// This component renders the header for the application
const Header = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <h1 className="text-white px-2" href="#">
          VideCheck
        </h1>
      </div>
      <div class="container  justify-content-end">
        <div class="navbar-nav">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {props.user === null ? (
            <>
              <li>
                <Link className="nav-link" to="/signin">
                  Signin
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/forum">
                  Forum
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/" onClick={props.logoutUser}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
