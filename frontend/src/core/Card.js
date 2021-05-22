import React, {useState, useEffect} from "react"
import { Redirect } from "react-router";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemCart } from "./helper/cardHelper"

const Card = ({ product,
        addToCart = true,
        removeFromCart = false,
        setReload = f => f,
        // setReload = functio(f) { return f}
        reload = undefined
    }) => {

    const [redirect , setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)
    
    const getARedirect = (redirect) => {
        if(redirect) {
            return <Redirect to = "/cart" />
        }
    }

    const addItemtoCart = () => {

        addItemToCart(product, () => {
            setRedirect(true)
        })

    }


    const showAddToCart = (addToCart) => {
        
        return (
            addToCart && 
            <button
                onClick= { addItemtoCart }
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add to Cart
            </button>
        )

    }
    const showRemoveFromCart = (removeFromCart) => {

        return (
            removeFromCart && 
            <button
                onClick={ () => {
                    removeItemCart(product._id)
                    setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
                Remove from cart
            </button>
        )

    }

    return (

        <div className="card text-white bg-dark border border-info text-center">
            <div className="card-header lead">
                { product.name }
            </div>
            <div className="card-body">
                <ImageHelper product= { product }/>
                { getARedirect(redirect) }
                <p className="lead bg-success font-weight-normal text-wrap">
                    { product.description }
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">
                    ${ product.price }
                </p>
                <div className="row">
                    <div className="col-12">
                        { showAddToCart(addToCart) }
                    </div>
                    <div className="col-12">
                        { showRemoveFromCart(removeFromCart) }
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Card;