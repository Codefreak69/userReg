const express = require("express");
const router = express.Router();

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
    }

    const user = new User({ name, email, phone, password, cpassword });


    
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login Route

router.post("/login", async (req, res) => {
 
    
    try {
      const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if(!userLogin){
        res.status(400).json({ message: "User does not exist" });
    }else{

        res.status(200).json({ message: "User logged in successfully" });
    }


  } catch (err) {}
});

module.exports = router;
