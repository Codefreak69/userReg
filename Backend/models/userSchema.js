const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone :{
        type: Number,
        required :true
    },
    password: {
        type: String,
        required: true
    },
    cpassword : {
        type: String,
        required: true
    }
})

// hashing password for the user

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
        this.cpassword = await bcrypt.hash(this.cpassword, 8);
    }
    next()
})

// Creating Model for user Schema
const User = mongoose.model('USER', userSchema);

module.exports = User;