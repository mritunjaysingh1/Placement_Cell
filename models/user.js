const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// validate the password
userSchema.methods.isPasswordCorrect = async function (Password) {
  return this.password === Password;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
