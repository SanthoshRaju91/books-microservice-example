const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecommendSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  recommends: {
    type: Array,
    default: void 0
  }
});

module.exports = mongoose.model("Recommend", RecommendSchema);
