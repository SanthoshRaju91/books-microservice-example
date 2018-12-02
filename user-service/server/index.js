const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const RECOMMEND_API = require("../apis/recommend.api");
const USER_API = require("../apis/user.api");
const FAVOURITE_API = require("../apis/favourite.api");

console.log(RECOMMEND_API);

const start = options => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(
        new Error("The server must be started with a connection repository")
      );
    }

    if (!options.port) {
      reject(new Error(`The server must be started with an available port`));
    }

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(helmet());
    app.use((err, req, res, next) => {
      reject(new Error(`Something went wront!, err ${err}`));
      res.status(500).send(`Something went wrong`);
    });

    // Connect to all API's
    RECOMMEND_API(app, options);
    USER_API(app, options);
    FAVOURITE_API(app, options);

    const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, { start });
