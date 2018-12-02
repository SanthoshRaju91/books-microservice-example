const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  favourites: [String]
});

UserSchema.pre("save", async function(next) {
  try {
    let user = this;

    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSaltSync(SALT_WORK_FACTOR);

    const hashPassword = await bcrypt.hashSync(user.password, salt);

    user.password = hashPassword;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
