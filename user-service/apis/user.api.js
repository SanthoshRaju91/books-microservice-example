const STATUS = require("http-status");

const User = (app, options) => {
  const { repo } = options;

  app.post("/user/create", async (req, res) => {
    try {
      let { username, password, firstname, lastname, email } = req.body;

      username = username && username.length >= 5 ? username : false;
      password = password && password.length >= 4 ? password : false;
      email = email ? email : false;
      firstname = firstname ? firstname : false;
      lastname = lastname ? lastname : false;

      if (username && password && email && firstname && lastname) {
        const newUser = await repo.createUser({
          username,
          password,
          email,
          firstname,
          lastname
        });

        res.status(STATUS.OK).json({
          success: true,
          message: "User created!!"
        });
      } else {
        res.status(STATUS["500"]).json({
          success: false,
          message: "One of the required fields is missing validation"
        });
      }
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.get("/user/get/all", async (req, res) => {
    try {
      const users = (await repo.getAllUsers()) || [];

      res.status(STATUS.OK).json({
        success: true,
        users
      });
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.get("/user/get/:userid", async (req, res) => {
    try {
      const { userid } = req.params;
      const user = (await repo.getUser(userid)) || {};

      res.status(STATUS.OK).json({
        success: true,
        user
      });
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.post("/user/update/:userid", async (req, res) => {
    try {
      const { userid } = req.params;

      const user = await repo.getUser(userid);

      if (user) {
        const updated = await repo.updateUser(user, req.body);

        res.status(STATUS.OK).json({
          success: true,
          message: `Updated`
        });
      } else {
        res.json(STATUS.OK).json({
          success: false,
          message: `User doesn't exits`
        });
      }
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.post("/user/delete", async (req, res) => {
    try {
      const { userid } = req.body;
      const deleted = await repo.deleteUser(userid);

      if (deleted) {
        res.status(STATUS.OK).json({
          success: true,
          message: "Deleted"
        });
      } else {
        res.status(STATUS.OK).json({
          success: false,
          message: `User doesn't exists`
        });
      }
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.post("/user/favourites/add", async (req, res) => {
    try {
      const { userid, favourites } = req.body;
      const user = await repo.getUser(userid);

      if (user) {
        await repo.addFavourites(user, favourites);

        res.status(STATUS.OK).json({
          success: true,
          message: `Favourites added`
        });
      } else {
        res.status(STATUS.OK).json({
          success: false,
          message: `User doesn't exists`
        });
      }
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });
};

module.exports = User;
