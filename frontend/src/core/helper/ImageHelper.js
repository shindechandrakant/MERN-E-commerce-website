import React from 'react';
import { API } from "../../backend";

function ImageHelper({ product }) {

    const imageUrl = product 
    ? `${API}/product/photo/${product._id}` 
    : "https://images.pexels.com/photos/2205839/pexels-photo-2205839.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

    return (

        <div className="rounded border border-success p-2">
            <img
                src={ imageUrl }
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    );
}

export default ImageHelper;