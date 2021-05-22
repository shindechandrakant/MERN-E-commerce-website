
import { API } from "../../backend"


export const createOrder = (userId, token, orderData) => {

    return fetch(`${API}/create/order/${userId}`, {

        method: "POST",
        Headers : {

            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: orderData})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log('Error occured while odering ', err))


}