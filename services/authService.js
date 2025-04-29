const connection = require("././../models");
const sequelize = connection.sequelize;
const Models = sequelize.models;

const { users } = Models;

const authService = {
  findOne: async (data) => {
    try {
      let result = await users.findOne({ where: data });
      return result || false;
    } catch (error) {
      console.log(error, "error while fetching the user");
    }
  },

  createUser: async (data) => {
    try {
      let result = await users.create(data);
      return result || false;
    } catch (error) {
      console.log(error, "error while inseting the data for the user");
    }
  },

  update: async (data, id) => {
    try {
      let result = await users.updateOne(data, { where: { id: id } });
      return result;
    } catch (error) {
      console.log(error, "error while updating the data for the user");
    }
  },
  getList: async (data) => {
    try {
      let result = await users.findAll({
        attributes: [
          ["id", "publicId"],
          "name",
          "email",
          "status",
          "createdAt",
        ],
        limit: data.limit,
        offset: data.offset,
        order: data.orderBy,
      });

      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authService;
