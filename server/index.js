require('dotenv').config();
const express = require('express');
const app = express();
const port = 7777;
const path = require('path');
const cors = require('cors');
const stripe = require('stripe')(process.env.STORE_SECRET_KEY);
const {v4: uuidv4} = require('uuid');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post("/payment", (req, res) => {

    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price)
    const idempotencyKey = uuidv4();

    return stripe.customers
    .create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase of ${product.name}.`,
            // shipping: {
            //     name: token.card.name,
            //     address: {
            //         country: token.card.address_country
            //     }
            // }
        }, {idempotencyKey});
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})
// app.get("*", (req, res) => {
//     res.send("hi from server");
// })

app.listen(port, ()=>{console.log(`Listening on port: ${port}`)});

app.use(express.static(path.join(__dirname, "../client/dist")));

