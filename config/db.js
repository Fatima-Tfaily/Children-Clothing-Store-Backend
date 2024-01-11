require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

async function dbConnection() {
  await mongoose.connect(MONGODB_URL);
}

module.exports = dbConnection;
