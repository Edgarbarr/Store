import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
const axios = require('axios');


function App(){
    const [product, setProduct] = useState({
        name: "Television",
        price: 800,
        country: "United States",
        productImage: "https://www.ikea.com/us/en/images/products/brimnes-tv-bench__0850878_PE608594_S5.JPG"
    })
    const makePayment = token => {
        const body = {
            token,
            product,
        }
        const headers = {
            "Content-Type": "application/json"
        }
        axios.post("http://localhost:7777/payment", body)
        .then(response => {
            console.log("Response: ", response)
            const {status} = response;
            console.log("Status: ", status);
        })
        .catch(error => console.log(error));
    }
    return (
        <div>
            <div>
                <span>{product.name}</span>
                <img height="200" width="200" src={product.productImage}/>
                <span>Price: {product.price}</span>
                <StripeCheckout stripeKey="" token={makePayment} name="Checkout" amount={product.price * 100}>
                    <button>Checkout</button>
                </StripeCheckout>
            </div>
        </div>
    )
}
export default App;