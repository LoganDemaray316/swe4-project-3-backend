const { SqlError } = require("mariadb");
const Buildings = require("./buildings.model");

module.exports = (sequelize, Sequelize) => {
  const Rooms = sequelize.define(
    "rooms",
    {
      number: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      /*      buildingID: {
        type: Sequelize.INTEGER,
      },*/
    },
    { timestamps: false }
  );

  return Rooms;
};
