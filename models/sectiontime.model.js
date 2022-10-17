const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const SectionTime = sequelize.define(
    "sectiontime",
    {
      sectionID: {
        type: Sequelize.INTEGER,
      },
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
  return SectionTime;
};
