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

userSchema.pre("save", async function (next) {
  try {
    if (!this.userId) {
      const existingUsers = await mongoose.model("Users").find();
      const lastUserId =
        existingUsers.length > 0
          ? existingUsers[existingUsers.length - 1].userId
          : 0;
      this.userId = lastUserId + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
