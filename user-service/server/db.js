/**
 * Creating MongoDB connection with mongoose
 */
const Mongoose = require("mongoose");
const config = require("../config");

const connect = mediator => {
  mediator.once("boot.ready", () => {
    Mongoose.connect(config.db);

    Mongoose.connection.on("open", () => {
      console.log("Database connection established");
      mediator.emit("db.ready");
    });

    Mongoose.connection.on("error", err => {
      mediator.emit("db.error", err);
    });
  });
};

module.exports = Object.assign({}, { connect });
