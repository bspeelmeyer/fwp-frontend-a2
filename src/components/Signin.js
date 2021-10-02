import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { verifyUser } from "../data/repository";

// This component returns and handles the
// sign of already registered users

const Signin = (props) => {
  const history = useHistory();

  // set useState for form fields
  const [fields, setFields] = useState({ user_name: "", password: "" });

  // Change handler
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  // Handle submit of the form
  const handleSubmit = async (event) => {
    // Stop redirect on form submit
    event.preventDefault();

    // Make API call to ensure credentials are correct
    const user = await verifyUser(fields.user_name, fields.password);

    // If statement alerts the user to invalid credentials
    if (user === null) {
      setFields({ ...fields, password: "" });
      alert("Username and or password is incorrect, please try again.");
      return;
    }

    // Call function to add user to local storage
    props.loginUser(user);

    // Redirect to
    history.push("/");
  };

  return (
    <div class="container">
      <div className="row border-bottom">
        <h2 className="text-center">Sign in</h2>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-6">
          {/* Form start */}
          <form onSubmit={handleSubmit}>
            <div class="form-group py-2">
              <label class="" htmlFor="user_name">
                User_name
              </label>
              <input
                class="form-control"
                id="user_name"
                name="user_name"
                placeholder="Enter user_name"
                value={fields.user_name}
                onChange={handleInputChange}
              ></input>
            </div>

            <div class="form-group py-2 border-bottom pb-3">
              <label class="" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                placeholder="Enter password"
                value={fields.password}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="row py-2">
              <div class="form-group py-2 ">
                <button type="submit" class="btn btn-dark w-100">
                  Sign in
                </button>
              </div>
            </div>
            <div className="row">
              <div class="form-group">
                <Link className="btn btn-dark w-100" to="/">
                  Cancel
                </Link>
              </div>
            </div>
            {/* Form end */}
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Signin;
