const STATUS = require("http-status");

const Recommend = (app, options) => {
  const { repo } = options;

  // update recommend for changing the status of the recommend from
  // seen / not_seen
  app.post("/recommend/update", async (req, res) => {
    try {
      const { user, recommendId } = req.body;

      const updated = await repo.updateRecommend({ user, recommendId });

      res.status(STATUS.OK).json({
        success: true
      });
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: "Something went wrong in updatning recommend"
      });
    }
  });

  app.get("/recommend/get", async (req, res) => {
    try {
      const { userid } = req.body;

      const recommends = (await repo.getRecommends(userid)) || [];

      res.status(STATUS.OK).json({
        success: true,
        recommends
      });
    } catch (err) {
      res.status(STATUS["500"]).json({
        success: false,
        message: "Something went wrong in updatning recommend"
      });
    }
  });
};

module.exports = Recommend;
