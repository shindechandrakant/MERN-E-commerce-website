import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getProduct, updateProduct, getCategories } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({match}) => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({

        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect: "",
        formData: "",
        success: null
    });

    const { name, description, price, stock,
            photo, categories, category, loading, error, 
            createdProduct, getRedirect, formData, success } = values;

    const preload = async (productId) => {

            await getProduct(productId)
            .then(data => {
                
                console.log(data)
                if(data  && data.error) {

                    setValues({ ...values, error: data.error })
                }
                else {

                    setValues({ 
                        ...values, 
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        stock: data.stock,
                        category: data.category.name, 
                        formData: new FormData()
                    })
                    // preLoadCategories();
                    console.log("CAT : ", data.category.name)
                }
            });
        }
        
        const preLoadCategories = async () => {
            
            await getCategories()
            .then(data => {
                if(data.error) {
                    setValues({...values, error : data.error})
                }
                else {
                    setValues({
                        ...values,
                        categories : data,
                        formData : new FormData()
                    })
                }
                console.log("CATES : ", data)
        });
    }

    useEffect( () => {

            preload(match.params.productId);
    }, [])


    const successMessage = () => {

        if(success) {
            return(
                <div
                    className="alert alert-success mt-3"
                >
                    <h4>{createdProduct } updated Successfully</h4>
                </div>
            )
        }
    }

    const errorMessage = () => {
        
        if(error) {

            return(
                <div
                    className="alert alert-danger mt-3"
                >
                    <h4>{ createdProduct }, something went wrong!! { error } </h4>
                </div>
            )
        }
    }



    const onSubmit = (event) => {
        
        event.preventDefault();
        setValues({ ...values, error: "", loading: true })

        updateProduct(match.params.productId ,user._id, token, formData)
        .then(response => {

            if(response.error) {
                setValues({...values, error: response.error, loading: false, success: false})
            }
            else {
                
                setValues({
                    ...values, 
                    error: "", 
                    loading: false,
                    createdProduct: response.name,
                    name: "",
                    photo :"",
                    description: "",
                    price: "",
                    stock: "",
                    category: "",
                    success: true
                })
            }
        })
        .catch( error => console.log("Error occured while creating product : ", error))
    };

    const handleChange = (name) => (event) => {
        
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value})

    };

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success m-2">
                <input
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="choose a file"
                />
                </label>
            </div>
            <div className="form-group m-2">
                <input
                onChange={handleChange("name")}
                name="photo"
                className="form-control"
                placeholder="Name"
                value={name}
                />
            </div>
            <div className="form-group m-2">
                <textarea
                onChange={handleChange("description")}
                name="photo"
                className="form-control"
                placeholder="Description"
                value={description}
                />
            </div>
            <div className="form-group m-2">
                <input
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                />
            </div>
            <div className="form-group m-2">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                <option
                    value = { category }
                >
                    Select</option>
                { categories &&
                    categories.map((cate, index) => (
                        <option key={ index } value={ cate._id } >{ cate.name }</option>
                    ))
                }
                
                </select>
            </div>
            <div className="form-group m-2">
                <input
                onChange={handleChange("stock")}
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={stock}
                />
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success m-2"
            >
                Update Product
            </button>
        </form>
    );

    return (
        <Base
            title="Add a product here!"
            description="Welcome to product creation section"
            className="container bg-info p-4"
            >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    { successMessage() }
                    { errorMessage() }
                    { createProductForm() }
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;