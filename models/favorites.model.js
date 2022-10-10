const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Favorites = sequelize.define(
    "favorites",
    {
      userID: {
        type: Sequelize.INTEGER,
      },
      courseID: {
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return Favorites;
};
