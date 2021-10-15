import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteUser } from "../data/repository";

const Profile = (props) => {
  const history = useHistory();

  if (props.user == null) {
    history.push("/signin");
    return null;
  }

  const handleClick = () => {
    async function removeUser(){
      const user = {
        user_name: props.user.user_name,
      }
      await deleteUser(user);
    }
    removeUser();
    props.logoutUser();
    history.push("/") ;
  }
  return (
    <div class="container w-50 py-3">
      <div className="card">
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
              <div onClick={ handleClick }>
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
