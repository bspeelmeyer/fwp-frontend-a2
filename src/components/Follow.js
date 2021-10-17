import React, { useState, useEffect } from "react";
import SpinningCircles from "react-loading-icons/dist/components/spinning-circles";
import { useHistory } from "react-router";
import {
  getUsers,
  getFollows,
  createFollow,
  deleteFollow,
} from "../data/repository";

const Follow = (props) => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [follows, setFollows] = useState([]);
  // Is loading function sourced from week 8 tutorial
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [following, setFollowing] = useState(false);
  const [unfollowing, setUnfollowing] = useState(false);

  // The useEffect hook populates the users and follows
  // states.
  useEffect(() => {
    // creates object to parse to database
    const user = {
      user_name: props.user.user_name,
    };

    // Function gets all users and an
    // array of users that the logged in
    // user follows
    async function loadUsersFollowers() {
      const currentUsers = await getUsers(user);
      const currentFollows = await getFollows(user);

      // Sets users and follows states
      setUsers(currentUsers);
      setFollows(currentFollows);
      setIsLoading(false);
    }
    // Function call
    loadUsersFollowers();
  }, [value, props.user.user_name]);

  // Function checks if user from
  // user array exists in the follows
  // array
  const userExists = (user_name) => {
    return follows.some(function (element) {
      return element.followed === user_name;
    });
  };

  // Handles user clicking follow icon
  const handleFollow = (user_name) => {
    // Create object to send to database
    const follow = {
      follower: props.user.user_name,
      followed: user_name,
    };

    // Function to create follow instance
    // in the database
    async function createNewFollow() {
      await createFollow(follow);
    }

    // Function call
    createNewFollow();

    setFollowing(true);
    setTimeout(function () {
      setFollowing(false);
    }, 2000);

    // Change useEffect dependant state
    // to force rerender of component
    setValue(value + 1);

    // Force posts to rerender
    props.setValue(props.value + 1);
  };

  // Function is the logical inverse of
  // the handle Follow function
  const handleUnfollow = (user_name) => {
    const follow = {
      follower: props.user.user_name,
      followed: user_name,
    };

    async function deleteOldFollow() {
      await deleteFollow(follow);
    }
    deleteOldFollow();

    setUnfollowing(true);
    setTimeout(function () {
      setUnfollowing(false);
    }, 2000);

    setValue(value + 1);

    props.setValue(props.value + 1);
  };

  // If user is not logged in
  // redirect to sign in page
  if (props.user == null) {
    history.push("/signin");
  }

  return (
    <div className="container ">
      <div className="row bg-dark text-white rounded-3 ">
        <h2 className="text-center">User List</h2>
      </div>
      <div className="row py-2">
        {following ? (
          <div className="alert alert-success shadow-lg" role="alert">
            <p>Successfully followed</p>
          </div>
        ) : null}
        {unfollowing ? (
          <div className="alert alert-success shadow-lg" role="alert">
            <p>Successfully unfollowed</p>
          </div>
        ) : null}
      </div>
      {isLoading ? (
        <div>
          <SpinningCircles />
        </div>
      ) : (
        users.map((x) => (
          <div className="container py-1 px-0">
            <div className="card shadow-lg">
              <h5 className="card-header bg-dark text-white">{x.user_name}</h5>
              <div className="card-footer bg-dark text-white">
                <div className="row">
                  {userExists(x.user_name) ? (
                    <div
                      onClick={() => handleUnfollow(x.user_name)}
                      className="col-1 px-1 text-end"
                    >
                      <h4>
                        <i className="bi bi-person-x"></i>
                      </h4>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleFollow(x.user_name)}
                      className="col-1 px-1 text-end"
                    >
                      <h4>
                        <i className="bi bi-person-plus"></i>
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Follow;
