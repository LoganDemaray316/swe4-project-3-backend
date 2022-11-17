const { SqlError } = require("mariadb");
const Courses = require("./courses.model");
const Semesters = require("./semesters.model");

module.exports = (sequelize, Sequelize) => {
  const Sections = sequelize.define(
    "sections",
    {
      /*
      courseID: {
        type: Sequelize.INTEGER,
      },
      semesterID: {
        type: Sequelize.INTEGER,
      },*/
      number: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
  return Sections;
};
