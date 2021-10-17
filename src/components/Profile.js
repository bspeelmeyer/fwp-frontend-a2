import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteUser } from "../data/repository";

const Profile = (props) => {
  const history = useHistory();
  const [deleteAlert, setDeleteAlert] = useState(false);

  // Check if user is logged in
  // if not redirect
  if (props.user == null) {
    history.push("/signin");
    return null;
  }

  // Handle delete button click
  const handleClick = () => {
    // Function creates API
    // call to delete user from
    // database
    async function removeUser() {
      // Create object to be parsed
      // to the database
      const user = {
        user_name: props.user.user_name,
      };
      await deleteUser(user);
    }
    removeUser();

    // Show alert for 2 seconds
    setDeleteAlert(true);
    setTimeout(function () {
      // Remove user from local storage
      props.logoutUser();

      // Redirect to landing page
      history.push("/");
    }, 2000);
  };
  return (
    <div class="container w-50 py-3">
      <div className="row">
        {deleteAlert ? (
          <div className="alert alert-success shadow-lg" role="alert">
            <p>Successfully deleted post</p>
          </div>
        ) : null}
      </div>
      <div className="card shadow-lg">
        <h5 className="card-header bg-dark text-white">Profile</h5>
        <div className="card-body">
          <h5 className="card-title">{props.user.user_name}</h5>
        </div>
        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item">
            First name: {props.user.first_name}
          </li>
          <li className="list-group-item">Last name: {props.user.last_name}</li>
          <li className="list-group-item">Email: {props.user.email}</li>
        </ul>
        <div className="card-footer bg-dark">
          <div className="row">
            <div className="col-10"></div>
            <div className="col-1 text-end">
              <Link to="/edit-profile">
                <h3>
                  <i className="bi bi-pencil-square text-white"></i>
                </h3>
              </Link>
            </div>
            <div className="col-1 text-end">
              <div onClick={handleClick}>
                <h3>
                  <i className="bi bi-trash text-danger"></i>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
