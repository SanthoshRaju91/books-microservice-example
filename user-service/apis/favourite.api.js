const STATUS = require("http-status");

const Favourite = (app, options) => {
  const { repo } = options;

  app.post("/favourite/create", async (req, res) => {
    try {
      const { code, label } = req.body;
      const created = await repo.createFavourite({ code, label });

      res.status(STATUS.OK).json({
        success: true,
        message: `Favourite created!`
      });
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.get("/favourite/get/all", async (req, res) => {
    try {
      const favourites = (await repo.getAllFavourites()) || [];

      res.status(STATUS.OK).json({
        success: true,
        favourites
      });
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.get("/favourite/get/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const favourite = (await repo.getFavourite(code)) || {};

      res.status(STATUS.OK).json({
        success: true,
        favourite
      });
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: `Something went wrong`
      });
    }
  });

  app.post("/favourite/delete", async (req, res) => {
    try {
      const { id } = req.body;
      const deleted = await repo.deleteFavourite(id);

      if (deleted) {
        res.status(STATUS.OK).json({
          success: true,
          message: "Deleted!"
        });
      } else {
        res.status(STATUS.OK).json({
          success: false,
          message: `Favourite doesn't exist`
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

module.exports = Favourite;
