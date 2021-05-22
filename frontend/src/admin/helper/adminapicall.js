import { API } from "../../backend"

// create product
export const createCategory= (userId, token, category) => {

    return fetch(`${API}/category/create/${userId}`,
    {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log("Error in admin cat call : ", error));
}

// get All categories
export const getCategories = () => {

    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log("Error while fetching all categories ", error)
    })

} 

// product calls
export const createProduct = (userId, token, product) => {

    return fetch(`${API}/product/create/${userId}`,  {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        
        console.log(JSON.stringify(response))
        return response.json();

    })
    .catch(err => console.log("error occured while creating product ", err))

}

// get All Products
export const getProducts = () => {

    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log("Error while fetching all products ", error)
    })

}

// get single product
export const getProduct = async (productId) => {

    return await fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {

        console.log("RES : ", response)
        return response.json();
    })
    .catch(error => {
        console.log("Error while fetching a product ", error)
    })

}

// update a product 
export const updateProduct = async(productId, userId, token, product) => {

    return await fetch(`${API}/product/${productId}/${userId}`, {
        
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log("error occured while creating product ", err))

}


// delete product ID
export const deleteProduct = (productId, userId, token) => {

    return fetch(`${API}/product/${productId}/${userId}`, 
    {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log("error occured while deleting product ", err))

}
