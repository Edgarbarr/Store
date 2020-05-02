const express = require('express');
const app = express();
const port = 7777;
const path = require('path');

app.listen(port, ()=>{console.log(`Listening on port: ${port}`)});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
    res.send("hi from server");
})