import React, { useEffect, useState } from 'react';
import "../../src/styles.css"
import Base from "../core/Base"
import Card from "./Card"
import { getProducts } from "./helper/coreapicalls"

function Home () {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const fetchAllProducts = () => {
        getProducts()
        .then(response => {
            if(response.error) {

                setError(true)
            }
            else {
                // setError(false)
                setProducts(response) 
            }
        })
        .catch(err => {
            setError(true);
            console.log("something went wrong while fetching data", err)
        })
    }

    useEffect( () => {
        
        fetchAllProducts();
    }, [])


    return (
            <Base title="Home page" 
                description="A beautyful place to buy t-shirts"
            >
                <div className="row">
                    {
                        products.map((product, index) => {
                            return (
                                <div className="col-4">
                                    <Card key={index} product={ product }/>
                                </div>
                            )
                        })
                    }
                </div>  
            </Base>
    );
}

export default Home;










