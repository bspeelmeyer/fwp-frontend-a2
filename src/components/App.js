import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import { getUser, removeUser } from "../data/repository";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";

// import components and fragments
import Header from "../fragments/Header";
import Footer from "../fragments/Footer";
import LandingPage from "./LandingPage";
import Register from "./Register";
import Signin from "./Signin";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Forum from "./Posts";
import CreatePosts from "./CreatePost";
import CreateReplyPost from "./CreateReplyPost";
import EditPost from "./EditPost";

// Main application function
function App() {
  const [user, setUser] = useState(getUser());

  const updateUser = (user) => {
    removeUser();
    setUser(user);
  };

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    // Top level container
    <div className="d-flex flex-column min-vh-100">
      {/* Begin react router */}
      <Router>
        {/* Get header fragment */}
        <Header user={user} logoutUser={logoutUser} />

        {/* Main content container */}
        <div name="main container" className="container">
          {/* Switch for react router */}
          <Switch>
            {/* Route for landing page */}
            <Route exact path="/">
              <LandingPage user={ user } />
            </Route>

            {/* Route for register page */}
            <Route path="/register">
              <Register />
            </Route>

            {/* Route for signin page */}
            <Route path="/signin">
              <Signin loginUser={loginUser} />
            </Route>

            {/* Route for profile page */}
            <Route path="/profile">
              <Profile user={ user } logoutUser={ logoutUser } loginUser={ loginUser} />
            </Route>

            {/* Route for edit profile page */}
            <Route path="/edit-profile">
              <EditProfile user={ user } updateUser={ updateUser } />
            </Route>

            {/* Route for add forum */}
            <Route path="/forum">
              <Forum user={ user } />
            </Route>

            {/* Route for create post page */}
            <Route path="/create-post">
              <CreatePosts user={ user } />
            </Route>

            {/* Route for create reply post */}
            <Route path="/create-reply/:id">
              <CreateReplyPost user={ user } />
            </Route>

            {/* Route for edit posts */}
            <Route path="/edit-post/:id">
              <EditPost user={ user } />
            </Route>


          </Switch>
        </div>

        {/* Get footer fragment */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
