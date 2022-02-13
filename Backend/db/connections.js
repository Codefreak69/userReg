const mongoose = require("mongoose");

const DB = `mongodb+srv://Vikash:Vikashishero123$@cluster0.s4s7z.mongodb.net/UserRegistration?retryWrites=true&w=majority`

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err || `MongoDB Connection Error: ${err}`);
  }); 