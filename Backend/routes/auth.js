const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/connections");
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World from the backend");
});

// User Registration Route

router.post("/signup", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({
      message: "Please fill all the fields",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password is not matching" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      await user.save();

      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login Route

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }

    const userLogin = await User.findOne({ email: email });
    

    // authenticating using jwt

    token = await userLogin.generateAuthToken();
    // console.log(token)

    // saving the auth-token in cookies
    res.cookie("auth-token", token, {
      expires: new Date(Date.now() + 2590300000), // expire the auth-token in some days
      httpOnly: true
    })




// comparing user password with databse password
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credential pass" });
      } else {
        res.status(200).json({ message: "User logged in successfully" });
      }
    }
    else{
        res.json({message:"Invalid Credentials"})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
