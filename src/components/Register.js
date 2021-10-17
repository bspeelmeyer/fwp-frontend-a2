import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useValidateForm } from "../hooks/useValidateForm";
import { findUser, createUser } from "../data/repository";

const Register = (props) => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [userTaken, setUserTaken] = useState(false);

  // Configure fields for state tracking
  const [fields, setFields] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Use custom hook to validate the form
  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    match,
    specialChar,
    validEmail,
    hasName,
    hasFirstName,
    hasLastName,
  ] = useValidateForm({
    firstPassword: fields.password,
    secondPassword: fields.confirmPassword,
    email: fields.email,
    user_name: fields.user_name,
    first_name: fields.first_name,
    last_name: fields.last_name,
  });

  // Basic change handler
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  // Handler for form submit event
  const handleSubmit = async (event) => {
    // Prevent redirect on form submit
    event.preventDefault();

    // Check if all validation methods return true
    if (
      validLength &&
      hasNumber &&
      upperCase &&
      lowerCase &&
      match &&
      specialChar &&
      validEmail &&
      hasName
    ) {
      if ((await findUser(fields.user_name)) === null) {
        // Copy field values to user object
        const user = {
          username: fields.user_name,
          firstname: fields.first_name,
          lastname: fields.last_name,
          email: fields.email,
          password: fields.password,
        };

        // Make API call to create
        // user in the database
        await createUser(user);

        setSuccess(true);
        // Delay redirect so user
        // can see confirmation message
        setTimeout(function () {
          // Redirect to signin page
          history.push("/signin");
        }, 2000);
      } else {
        setUserTaken(true);
      }
    } else {
      setFail(true);
    }
  };

  return (
    <div class="container  ">
      {/* Conditional rendering of alerts */}
      <div className="row py-2">
        {success ? (
          <div className="alert alert-success shadow-lg" role="alert">
            <p>Successfully created profile.</p>
          </div>
        ) : fail ? (
          <div className="alert alert-danger shadow-lg" role="alert">
            <ul>
              {!hasFirstName ? <li>Must enter first name</li> : null}
              {!hasLastName ? <li>Must enter last name</li> : null}
              {!validEmail ? <li>Must enter valid email</li> : null}
              {userTaken ? <li> User name already taken</li> : null}
            </ul>
            <ul>
              {!validLength ? (
                <li>Password must be at least 8 characters</li>
              ) : null}
              {!upperCase ? (
                <li>Password must contain at least one upper case character</li>
              ) : null}
              {!specialChar ? (
                <li>Password must contain at least one special character</li>
              ) : null}
              {!hasNumber ? (
                <li>Password must contain at least one number</li>
              ) : null}
              {!lowerCase ? (
                <li>Password must contain at least one lower case character</li>
              ) : null}
              {!match ? <li>Passwords must match</li> : null}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="row py-0">
        <div className="col"></div>
        <div className="col-6">
          <div className="card shadow-lg">
            <h5 className="card-header bg-dark text-white">Register</h5>
            <div className="card-body">
              {/* Form start */}
              <form onSubmit={handleSubmit}>
                <div class="form-group py-2 ">
                  {/* User name input */}
                  <label class="" htmlFor="user_name">
                    User Name
                  </label>
                  <input
                    class="form-control"
                    id="user_name"
                    name="user_name"
                    placeholder="Enter user name"
                    value={fields.user_name}
                    onChange={handleInputChange}
                  ></input>
                </div>
                {/* First name input */}
                <div class="form-group py-2 ">
                  <label class="" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    class="form-control"
                    id="first_name"
                    name="first_name"
                    placeholder="Enter first name"
                    value={fields.first_name}
                    onChange={handleInputChange}
                  ></input>
                </div>
                {/* Last name input */}
                <div class="form-group py-2 ">
                  <label class="" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    class="form-control"
                    id="last_name"
                    name="last_name"
                    placeholder="Enter last name"
                    value={fields.last_name}
                    onChange={handleInputChange}
                  ></input>
                </div>
                {/* Email input */}
                <div class="form-group py-2">
                  <label class="" htmlFor="email">
                    Email address
                  </label>
                  <input
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={fields.email}
                    onChange={handleInputChange}
                  ></input>
                </div>
                {/* Password input */}
                <div class="form-group py-2">
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
                {/* Confirm password input */}
                <div class="form-group py-2">
                  <label class="" htmlFor="confirmPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={fields.confirmPassword}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="row py-2">
                  <div class="form-group">
                    <button type="submit" class="btn btn-dark w-100">
                      Register
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div class="form-group">
                    <Link className="btn btn-dark w-100" to="/profile">
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
              {/* End form */}
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Register;
