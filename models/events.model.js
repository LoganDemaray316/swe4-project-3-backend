const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Events = sequelize.define(
    "events",
    {
      semesterID: {
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      roomID: {
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return Events;
};
