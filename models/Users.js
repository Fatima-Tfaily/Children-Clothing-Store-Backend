const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
