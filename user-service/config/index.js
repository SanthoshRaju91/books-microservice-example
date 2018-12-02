/**
 * Configuration for user-service
 */
const config = {
  db: process.env.DB || "mongodb://localhost:27017/books",
  port: process.env.PORT || 3000
};

module.exports = Object.assign({}, config);
