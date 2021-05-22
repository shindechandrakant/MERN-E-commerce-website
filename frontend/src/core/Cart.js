import React, { useEffect, useState } from 'react';
import Base from "./Base"
import { loadCart } from "./helper/cardHelper"
import Card from "./Card"
import Payment from "./Payment"

function Cart() {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {

        setProducts(loadCart());
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <>
                {
                    products.map((product, index) => {
                        
                        return <Card 
                        key = { index }
                            product = { product }
                            addToCart = { false }
                            removeFromCart = { true }
                            setReload = { setReload }
                            reload = { reload }
                        />
                        })
                }
            </>
        )
    }



    const loadCheckOut = () => {

        return (
            <h1 className="text-white">
                this section for Check-out
            </h1>
        )
    }

    return (

        <Base title= "Cart Page" description = "Ready to Checkout">
            <div className="row">
                <div className="col-6">
                    {console.log(products.length)}
                    { products.length > 0 ? loadAllProducts(products) : (
                        <h4 className="text-white">
                            No products are available
                        </h4>
                    ) }
                </div>
                <div className="col-6">
                    <Payment products={products} setReload={ setReload }/>
                </div>
            </div>
        
        
        
        </Base>

    );
}

export default Cart;

