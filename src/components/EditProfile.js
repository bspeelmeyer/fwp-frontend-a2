import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useValidateForm } from "../hooks/useValidateForm";
import { findUser, updateUser } from "../data/repository";

const EditProfile = (props) => {
  const history = useHistory();

  useEffect(() => {
    setFields({
      user_name: props.user.user_name,
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
    });
  }, [
    props.user.user_name,
    props.user.first_name,
    props.user.last_name,
    props.user.email,
  ]);

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
        await updateUser(user);

        props.loginUser(user);

        // Redirect to signin page
        history.push("/profile");
      } else {
        alert("User name is already taken");
      }
    } else {
      // If validation returns at least
      // one false value alert user
      alert("please check form");
    }
  };

  return (
    <div class="container  ">
      <div className="row border-bottom">
        <h2 className="text-center">Edit Profile</h2>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-6">
          {/* Form start */}
          <form onSubmit={handleSubmit}>
            <div class="form-group py-2 ">
              {/* User name input */}
              <label class="" htmlFor="user_name">
                User Name
              </label>
              <input
                class="form-control"
                disabled
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
            {/* Error message for invalid input */}
            {hasFirstName ? (
              <p className="text-white my-auto">null</p>
            ) : (
              <p class="text-danger">Field must not be empty</p>
            )}
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
            {/* Error message for invalid input */}
            {hasLastName ? (
              <p className="text-white my-auto">null</p>
            ) : (
              <p class="text-danger">Field must not be empty</p>
            )}
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
            {/* Error message for invalid input */}
            {validEmail ? (
              <p className="text-white my-auto">null</p>
            ) : (
              <p class="text-danger">Must be valid email address</p>
            )}
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
            {/* Error messages for invalid password */}
            <div class="form-group ">
              <ul className="list-group py-2">
                <li className="list-group-item">
                  {validLength ? (
                    <p class="text-center my-auto text-success">
                      Password must be at least 8 characters{" "}
                    </p>
                  ) : (
                    <p class="text-center my-auto text-danger">
                      Password must be at least 8 characters
                    </p>
                  )}
                </li>
                <li className="list-group-item">
                  {upperCase ? (
                    <p class="text-center my-auto text-success">
                      Password must contain at least one upper case character
                    </p>
                  ) : (
                    <p class="text-center my-auto text-danger">
                      Password must contain at least one upper case character
                    </p>
                  )}
                </li>
                <li className="list-group-item">
                  {specialChar ? (
                    <p class="text-center my-auto text-success">
                      Password must contain at least one special character
                    </p>
                  ) : (
                    <p class="text-center my-auto text-danger">
                      Password must contain at least one special character
                    </p>
                  )}
                </li>
                <li className="list-group-item">
                  {hasNumber ? (
                    <p class="text-center my-auto text-success">
                      Password must contain at least one number
                    </p>
                  ) : (
                    <p class="text-center my-auto text-danger">
                      Password must contain at least one number
                    </p>
                  )}
                </li>
                <li className="list-group-item">
                  {lowerCase ? (
                    <p class="text-center my-auto text-success">
                      Password must contain at least one lower case character
                    </p>
                  ) : (
                    <p class="text-center my-auto text-danger">
                      Password must contain at least one lower case character
                    </p>
                  )}
                </li>
                <li className="list-group-item">
                  {match ? (
                    <p class="text-center my-auto text-success">
                      Passwords must match
                    </p>
                  ) : (
                    <p class="text-center my-auto text-danger">
                      Passwords must match
                    </p>
                  )}
                </li>
              </ul>
            </div>
            <div className="row py-2">
              <div class="form-group">
                <button type="submit" class="btn btn-dark w-100">
                  Confirm
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
        <div className="col"></div>
      </div>
    </div>
  );
};

export default EditProfile;
