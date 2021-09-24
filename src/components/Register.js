import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useValidateForm } from '../hooks/useValidateForm';

const Register = (props) => {

    // Configure fields for state tracking
    const [fields, setFields] = useState({name: "", email: "", password: "", confirmPassword: "", dateJoined: ""});

    // Use custom hook to validate the form
    const [validLength, hasNumber, upperCase, lowerCase, match, specialChar, validEmail, hasName
    ] = useValidateForm({
        firstPassword: fields.password,
        secondPassword: fields.confirmPassword,
        email: fields.email,
        name: fields.name
    });

    // Basic change handler
    const handleInputChange = (event) => {
        setFields({...fields, [event.target.name]: event.target.value});
       
    }

    // Handler for form submit event
    const handleSubmit = (event) => {
        
        // Prevent redirect on form submit
        event.preventDefault();
        
        // Check if all validation methods return true
        if(validLength && hasNumber && upperCase && lowerCase && match && specialChar && validEmail && hasName){
            
            // Check if email already exists
            if("true" === "true"){
                alert("Email is already taken");
                
            }else{
                // Date and set joined date field
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;

                fields.dateJoined = today;

                // Copy field values to user object
                const user = {...fields};
                
                // Call function to add user object
                // to local storage
                // insertUser(user);
                props.history.push("/signin");
            }
            
        }else{

            // If validation returns atleast 
            // one false value alert user
            alert("please check form");
        }
        
    }

    
    

    return (
    <div class="container  ">
        <div className="row border-bottom">
            <h2 className="text-center">Register</h2>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-6">
                <form onSubmit={handleSubmit}>
                    <div class="form-group py-2 ">
                        <label class="" htmlFor="name">Name</label>
                        <input  class="form-control" id="name" name="name"  placeholder="Enter name"
                            value={fields.name} onChange={handleInputChange}></input>
                    </div>
                    {hasName ? null : <p class="text-danger">Field must not be empty</p>}
                    <div class="form-group py-2">
                        <label class="" htmlFor="email">Email address</label>
                        <input  class="form-control" id="email" name="email" placeholder="Enter email"
                            value={fields.email} onChange={handleInputChange}></input>
                    </div>
                    {validEmail ? null : <p class="text-danger">Must be valid email address</p>}
                    <div class="form-group py-2">
                        <label class="" htmlFor="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Enter password"
                            value={fields.password} onChange={handleInputChange}></input>
                    </div>
                    <div class="form-group py-2">
                        <label class="" htmlFor="confirmPassword">Password</label>
                        <input type="password" class="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm password"
                            value={fields.confirmPassword} onChange={handleInputChange}></input>
                    </div>
                    <div class="form-group ">
                        <ul className="list-group py-2">
                            <li className="list-group-item">
                                {validLength ? <p class="text-center my-auto text-success">Password must be atleast 8 characters </p> : <p class="text-center my-auto text-danger">Password must be atleast 8 characters</p>}
                            </li>
                            <li className="list-group-item">
                                {upperCase ? <p class="text-center my-auto text-success">Password must contain atleast one upper case character</p> : <p class="text-center my-auto text-danger">Password must contain atleast one upper case character</p>}
                            </li>
                            <li className="list-group-item">
                                {specialChar ? <p class="text-center my-auto text-success">Password must contain atleast one special character</p> : <p class="text-center my-auto text-danger">Password must contain atleast one special character</p>}
                            </li>
                            <li className="list-group-item">
                                {hasNumber ? <p class="text-center my-auto text-success">Password must contain atleast one number</p> : <p class="text-center my-auto text-danger">Password must contain atleast one number</p>}
                            </li>
                            <li className="list-group-item">
                                {lowerCase ? <p class="text-center my-auto text-success">Password must contain atleast one lower case character</p> : <p class="text-center my-auto text-danger">Password must contain atleast one lower case character</p>}
                            </li>
                            <li className="list-group-item">
                                {match ? <p class="text-center my-auto text-success">Passwords must match</p> : <p class="text-center my-auto text-danger">Passwords must match</p>}
                            </li>
                        </ul>
                    </div>
                    <div className="row py-2">
                        <div class="form-group">
                            <button type="submit" class="btn btn-dark w-100">Submit</button>
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group">
                            <Link className="btn btn-dark w-100" to="/">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col"></div>
        </div>
    </div>
    );
}

export default Register;