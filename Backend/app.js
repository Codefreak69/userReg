const express = require('express');
const app = express();
const port = 6900 || process.env.PORT;


require("./db/connections");


app.get("/", (req,res) =>{
    res.send("Hello World!!!");
})

app.get("/about", (req,res) =>{
    res.send("About Page");
})

app.get("/login", (req,res) =>{
    res.send("Login Page");
})

app.get("/signup", (req,res) =>{
    res.send("Registeration Page");
})

app.listen(port, () =>{
    console.log(`Server is firing at port : ${port}`);
})