import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// This component returns and handles the
// sign of already registered users

const Signin = (props) => {
    
    // set useState for form fields
    const [fields, setFields] = useState({email: "", password: ""});

    // set useState for error message
    const [errorMessage, setErrorMessage] = useState(null);

    // Change handler
    const handleInputChange = (event) => {
        setFields({...fields, [event.target.name]: event.target.value});
    };

    // Handle submit of the form
    const handleSubmit = (event) => {
        
        // Stop redirect on form submit
        event.preventDefault();

        // Check user is valid
        // const verified = validateUser(fields.email, fields.password);

        // If valid login
        // if(verified === true){
            // props.loginUser(fields.email);
            // alert("Welcome " + getName(fields.email));
            // props.history.push("/home");
            // return;
        // }

        // Reset fields
        // const temp = {...fields};
        // temp.password = "";
        // setFields(temp);

        // Set error message
        // setErrorMessage("Invaild credentials, please try agian");

    }
    
    return (
        <div class="container">
            <div className="row border-bottom">
                <h2 className="text-center">Sign in</h2>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-6">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group py-2">
                            <label class="" htmlFor="email">Email address</label>
                            <input  class="form-control" id="email" name="email" placeholder="Enter email"
                                value={fields.email} onChange={handleInputChange}></input>
                        </div>
                    
                        <div class="form-group py-2 border-bottom pb-3">
                            <label class="" htmlFor="password">Password</label>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Enter password"
                                value={fields.password} onChange={handleInputChange}></input>
                        </div>
                        <div className="row py-2">
                            <div class="form-group py-2 ">
                                <button type="submit" class="btn btn-dark w-100">Sign in</button>
                            </div>
                        </div>
                        <div className="row">
                            <div class="form-group">
                                <Link className="btn btn-dark w-100" to="/">Cancel</Link>
                            </div>
                        </div>
                        <div className="form-group">
                            <span className="text-danger">{errorMessage}</span>
                        </div>
                    </form>
                </div>
            <div className="col"></div>
            </div>
        </div>
        
    );
}

export default Signin;