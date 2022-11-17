const { SqlError } = require("mariadb");
const Users = require("./users.model");
const Courses = require("./courses.model");

module.exports = (sequelize, Sequelize) => {
  const Favorites = sequelize.define(
    "favorites",
    {
      /*userID: {
        type: Sequelize.INTEGER,
      },
      courseID: {
        type: Sequelize.INTEGER,
      },*/
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );

  return Favorites;
};
