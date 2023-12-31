const mongoose = require("mongoose");

const { isEmail } = require("validator");

const bcrypt = require("bcrypt");

const userdb = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "this  email is already exist"],
    index: true,
    lowercase: true,
    validate: [isEmail, "Please enter an valide email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Password must be more than or equal to 6 charaters"],
  },
});

userdb.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method

userdb.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }

  throw Error("Incorrect email");
};

const User = mongoose.model("User", userdb);

module.exports = User;
