/**
 * User microservice index file for server bootstrap
 */

const { EventEmitter } = require("events");

const db = require("./server/db");
const server = require("./server");
const repository = require("./repository");
const config = require("./config");

const mediator = new EventEmitter();

// event handler for uncaughtexception
// process.on("");

// event handler for uncaughtRejections
// process.on("");

mediator.on("db.ready", () => {
  // starting server with service repo
  const serverOptions = {
    port: config.port,
    repo: repository
  };

  server.start(serverOptions).then(() => {
    console.log(`Server started on port ${serverOptions.port}`);

    mediator.emit("server.ready");
  });
});

mediator.on("server.ready", () => {
  // start service bus listeners
});

mediator.on("db.error", err => {
  console.log(`Error with DB start ${err}`);
});

db.connect(mediator);

mediator.emit("boot.ready");
