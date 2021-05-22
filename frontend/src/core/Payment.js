import React, { useEffect, useState } from 'react';
import { loadCart, emptyCart } from "./helper/cardHelper"
import { Link } from "react-router-dom"
import { getToken, processPayment } from "./helper/paymentHelper"
import { createOrder } from "./helper/orderHelper"
import { isAuthenticated } from "../auth/helper/index"
import DropIn from "braintree-web-drop-in-react"


function Payment({

    products,
    setReload = f => f,
    reload = undefined
}) {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "", 
        instance : {}
    }) 
    const { user, token}= isAuthenticated();
    const userId = user && user._id;
    


    const getTokenForMe = (userId, token) => {

        getToken(userId, token)
        .then(info => {

            console.log("Payment ", JSON.stringify(info))
            if(info.error) {

                setInfo({...info, error : info.error})
            }
            else {
                const clientToken = info.clientToken;
                setInfo({...info, clientToken: clientToken})
            }
        })
        .catch(err => console.log("Error occured while fetching token ", err))


    }


    useEffect(() => {

        getTokenForMe(userId, token)
    }, [])




    const showbtDropin = () => {

        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? (

                        <div>
                            <DropIn
                                options = {{authorization: info.clientToken}}
                                onInstance= {instance => (info.instance = instance)}
                            />
                            <button
                                className="btn btn-success btn-block"
                                onClick= { () => { onPurchase() }}
                            >
                                Buy
                            </button>
                        </div>

                    ): (
                        <div>
                            <h3>Add products to purchase</h3>
                        </div>
                    )
                }
            </div>
        )
    }

    const onPurchase = () => {

        setInfo({loading : true})
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                };

                processPayment(userId, token, paymentData)
                .then(res => {
                    
                    setInfo({...info, success: res.success, loading: false, error: false})

                    const orderData = {
                        products: products,
                        transaction_id: res.transaction.id,
                        amount: res.transaction.amount
                    }

                    createOrder(userId, token, orderData)
                    setReload(!reload)
                    console.log("Payment success")
                })
                .catch(err => {

                    console.log("Error occured while purchasing ", err)
                    setInfo({...info, success: false, error: err, loading: false})
                })
            })



    }

    const getAmount = () => {

        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        })
        return amount;
    }


    return (
        <div>
            <h3>Your Bill is ${ getAmount() }</h3>
            { showbtDropin() }
        </div>
    );
}

export default Payment;








