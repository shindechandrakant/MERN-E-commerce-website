import React, { useState } from 'react';
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import {signup, isAuthenticated} from "../auth/helper/index"
function Signup() {


    const [values, setValues] = useState({

        name: "",
        email: "",
        password: "",
        error: "",
        successful:false 
    });

    const { name, email, password, error, successful } = values;

    const handleChange = name => event => {

        setValues({...values, error: false, [name] : event.target.value})
    };

    const successMessage = () => {

        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style= {{ display: successful ? "" : "none" }}
                    >
                        New account was created Successfully. please {" "}
                        <Link to="/signin"> Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }
    
    const errorMessage = () => {

        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style= {{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    if(isAuthenticated()) {
        return <Redirect to="/">User</Redirect>
    }

    const onSubmit = event => {

        event.preventDefault();
        signup({name, email, password})
        .then( response => {
            if(response.error) {

                setValues({...values, error: response.error, successful : false} )
            }
            else {
                setValues({
                    ...values,
                    name : "",
                    email: "",
                    password: "",
                    successful: true
                })
            }
        })
        .catch(console.log("Error while Signup"))
    }

    const signUpForm = () => {

        return (
            <div className="row">
                {isAuthenticated()}
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input 
                                className="form-control" 
                                type="text" 
                                onChange = { handleChange("name") }
                                value = { name }
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                                className="form-control" 
                                type="email" 
                                onChange = { handleChange("email") }
                                value = { email }
                                />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                                className="form-control" 
                                type="password"
                                onChange = { handleChange("password") }
                                value = { password }
                                
                            />
                        </div> 
                        <button 
                            type="button" 
                            onClick = { onSubmit }
                            className="btn btn-success btn-lg btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title = "sign up" description = "Where user can signup!">
            { errorMessage() }
            { successMessage() }
            { signUpForm() }
        <p className="text-white text-center">{ JSON.stringify(values) }</p>
        </Base>

    );
}

export default Signup;