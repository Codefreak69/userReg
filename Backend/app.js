const express = require('express');
const app = express();
const port = 6900 || process.env.PORT;

// require("./middleware/middleware")
require("./db/connections");



app.use(express.json());
// middleware()

const middleware = (req, res, next) => {
    console.log("Middleware is running");
    next()
}

// linking the routes folder
app.use(require('./routes/auth'));



app.get("/about",middleware, (req, res) =>{
    res.send("About Page");
})

app.get("/login", (req,res) =>{
    res.send("Login Page");
})



app.listen(port, () =>{
    console.log(`Server is firing at port : ${port}`);
})