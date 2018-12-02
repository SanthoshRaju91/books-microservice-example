const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavouriteSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Favourite", FavouriteSchema);
