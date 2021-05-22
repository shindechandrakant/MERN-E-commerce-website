import { API } from "../../backend"


export const getProducts = () => {

    return fetch(`${API}/products`, {

        method: "GET",
    })
    .then(response => { 
        return response.json();
    })
    .catch(error => console.log("somwthing went wrong ALL CAT: ", error))

}






