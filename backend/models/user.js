const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  middlename: String,
  lastname: String,
  number: String,
  aadhaar: String,
  permanentAddress: String,
  currentAddress: String,
  email: { type: String, required: true, unique: true },
  password: String
});

module.exports = mongoose.model("User", UserSchema);
