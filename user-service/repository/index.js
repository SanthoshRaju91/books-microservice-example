const merge = require("lodash.merge");
const User = require("../models/user.model");
const Favourite = require("../models/favourites.model");
const Recommend = require("../models/recommend.model");

module.exports = {
  /**
   * Create user controller
   * @method createUser
   * @param {Object} user
   */
  async createUser({ username, password, email, firstname, lastname }) {
    try {
      const newUser = new User({
        username,
        password,
        email,
        firstname,
        lastname
      });
      return await newUser.save();
    } catch (err) {
      return err;
    }
  },

  /**
   * Get all users
   * @method getAllUsers
   */
  async getAllUsers() {
    try {
      return await User.find({});
    } catch (err) {
      return err;
    }
  },

  /**
   * Get a user based on id
   * @param {String} id
   */
  async getUser(id) {
    try {
      return await User.findById(id);
    } catch (err) {}
  },

  /**
   * Update user
   * @param {Object} user
   * @param {Object} update
   */
  async updateUser(user, update) {
    try {
      merge(user, update);
      return await user.save();
    } catch (err) {
      return err;
    }
  },

  /**
   *
   * @param {Object} user
   * @param {Array} favourites
   */
  async addFavourites(user, favourites = []) {
    try {
      console.log(user);
      merge(user, { favourites: favourites });
      console.log(user);
      // return await user.save();
    } catch (err) {
      return err;
    }
  },

  /**
   * Get user on fav
   * @param {Object} query
   */
  async getUserOnFav(query) {
    try {
    } catch (err) {}
  },

  /**
   * Delete a user
   * @param {Object} user
   */
  async deleteUser(id) {
    try {
    } catch (err) {}
  },

  /**
   * Create favourite
   * @param {Object} favourite
   */
  async createFavourite({ code, label }) {
    try {
      const newFavourite = new Favourite({ code, label });
      return await newFavourite.save();
    } catch (err) {
      return err;
    }
  },

  /**
   * Get all favourites
   */
  async getAllFavourites() {
    try {
      return await Favourite.find({});
    } catch (err) {
      return err;
    }
  },

  /**
   * Get favourite by code
   * @param {String} code
   */
  async getFavourite(code) {
    try {
    } catch (err) {}
  },

  /**
   * Delete favourite
   * @param {Object} favourite
   */
  async deleteFavourite(favourite) {
    try {
    } catch (err) {}
  },

  /**
   * Add recommend to the user
   * @param {Object} user
   * @param {Object} reccoment
   */
  async addRecommend(user, reccoment) {
    try {
    } catch (err) {}
  },

  /**
   * Get all recommends for user
   * @param {String} userid
   */
  async getRecommends(userid) {
    try {
    } catch (err) {}
  },
  /**
   * Update recommend for the user
   * @param {Object} recommend
   */
  async updateRecommend(recommend) {
    try {
    } catch (err) {}
  },

  /**
   * Delete recommend for the user
   * @param {Object} recommend
   */
  async deleteRecommend(recommend) {
    try {
    } catch (err) {}
  }
};
