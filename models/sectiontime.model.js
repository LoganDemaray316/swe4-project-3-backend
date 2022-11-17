const { SqlError } = require("mariadb");
const Sections = require("./sections.model");
const Rooms = require("./rooms.model");

module.exports = (sequelize, Sequelize) => {
  const SectionTime = sequelize.define(
    "sectiontime",
    {
      /*sectionID: {
        type: Sequelize.INTEGER,
      },*/
      startTime: {
        type: Sequelize.STRING,
      },
      endTime: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      endDate: {
        type: Sequelize.STRING,
      },
      daysOfWeek: {
        type: Sequelize.STRING,
      } /*
      roomID: {
        type: Sequelize.INTEGER,
      },*/,
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
  return SectionTime;
};
