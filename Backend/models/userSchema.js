const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const JWT_KEY="THISISASERETKEYFORJWTAUTHLOLXDLMAONOOBFKINGNIGGA"


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hashing password for the user

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
    this.cpassword = await bcrypt.hash(this.cpassword, 8);
  }
  next();
});

// generating Token

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, JWT_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    throw err;
  }
};

// Creating Model for user Schema
const User = mongoose.model("USER", userSchema);

module.exports = User;
