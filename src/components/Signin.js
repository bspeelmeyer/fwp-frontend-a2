import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { verifyUser } from "../data/repository";

// This component returns and handles the
// sign of already registered users

const Signin = (props) => {
  const history = useHistory();
  const [success, setSuccess] = useState();
  const [fail, setFail] = useState();

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
      setSuccess(false);
      setFail(true);
      return;
    }
    setFail(false);
    setSuccess(true);

    // Call function to add user to local storage
    props.loginUser(user);

    setTimeout(function () {
      // Redirect to
      history.push("/profile");
    }, 2000);
  };

  return (
    <div class="container">
      <div className="row py-2">
        {success ? (
          <div className="alert alert-success shadow-lg" role="alert">
            <p>You have successfully logged in.</p>
          </div>
        ) : fail ? (
          <div className="alert alert-danger shadow-lg" role="alert">
            <p>Incorrect login details.</p>
          </div>
        ) : null}
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-6">
          <div className="card shadow-lg">
            <h2 className="card-header bg-dark text-white">Signin</h2>
            <div className="card-body">
              {/* Form start */}
              <form onSubmit={handleSubmit}>
                <div class="form-group ">
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

                <div class="form-group py-1 ">
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
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Signin;
