import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = (props) => {

    const history = useHistory();

    

    if(props.user === null){
        history.push("/signin");
    };

          

    return (
    <div class="container py-3">
        <div className="row">
            <div className="col">
                <h2 className="text-end">Username:</h2>
            </div>
            <div className="col">
                <h2 className="text-start">{props.user.user_name}</h2> 
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2 className="text-end">First name:</h2>
            </div>
            <div className="col">
                <h2 className="text-start">{props.user.first_name}</h2> 
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2 className="text-end">Last name:</h2>
            </div>
            <div className="col">
                <h2 className="text-start">{props.user.last_name}</h2> 
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2 className="text-end">Email:</h2>
            </div>
            <div className="col">
                <h2 className="text-start">{props.user.email}</h2> 
            </div>
        </div>
        <div className="row">
            <Link to="/edit-profile"><button type="button" className="btn btn-dark">Edit profile</button></Link>
        </div>
    </div>
    );
}

export default Register;