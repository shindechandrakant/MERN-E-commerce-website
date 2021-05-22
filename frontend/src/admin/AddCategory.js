// component 
import React, { useState } from 'react';
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper/index"
import { Link } from 'react-router-dom';
import { API } from "../backend";
import { createCategory } from "./helper/adminapicall"

function AddCategory() {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, token } = isAuthenticated();

    const goBack = () => {

        return (
            <div className="mt-5">
                <Link 
                    className="btn btn-sm btn-success mb-3"
                    to="/admin/dashboard"
                >
                    Admin Home
                </Link>

            </div>
        )

    }

    const handleChange = (event) => {
        setName(event.target.value)
        setError("")
    }
    
    const onSubmit = (event) => {
        
        event.preventDefault();
        setError("")
        setSuccess(false);

        // backend Method fired
        createCategory(user._id, token, {name})
        .then(data => {

            if(data.error) {
                // TODO: category error should display
                console.log(data.error)
                setError(true);
            }
            else {
                setSuccess(true);
                setError(false);
                setName("")
            }

        })


    }

    const successMessage = () => {
        
        if(success) {
            return (
                <h3 
                    className="text-success">
                    Category created Successfully
                </h3>
            )
        }
    }
    const warningMessage = () => {

        if(error) {
            return (
                <h3 
                    className="text-warning">
                    Something went Wrong
                </h3>
            )
        }
    }


    const myCategoryForm = () => {

        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input
                    
                        type="text"
                        className="form-control my-3"
                        onChange = { handleChange }
                        value = { name }
                        autoFocus
                        required
                        placeholder="for Ex. Summer"
                    />
                    <button 
                        onClick = { onSubmit }
                        className="btn btn-outline-info">
                        Create Category
                    </button>
                </div>
            </form>
        )

    }

    return (
        <Base
            title="Create a new Category here"
            description="Add a new category for a new T-shirt"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    { successMessage() }
                    { warningMessage() }
                    { myCategoryForm() }
                    { goBack() }
                </div>

            </div>
        </Base> 

    );
}

export default AddCategory;