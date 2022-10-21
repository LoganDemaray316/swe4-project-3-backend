const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Sections = sequelize.define(
    "sections",
    {
      courseID: {
        type: Sequelize.INTEGER,
      },
      semesterID: {
        type: Sequelize.INTEGER,
      },
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
    },
    { timestamps: false }
  );
  return Sections;
};
