const mongoose = require("mongoose");
require("dotenv").config();

//connecting to database
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connecting the database"));

db.once("open", () => {
  console.log("succesfully connected to database");
});

//export module
module.exports = db;
