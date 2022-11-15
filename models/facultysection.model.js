const { SqlError } = require("mariadb");
const Faculty = require("./faculty.model");
const Sections = require("./sections.model");

module.exports = (sequelize, Sequelize) => {
  const FacultySection = sequelize.define(
    "facultysection",
    {
      /*facultyID: {
        type: Sequelize.INTEGER,
      },
      sectionID: {
        type: Sequelize.INTEGER,
      },*/
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return FacultySection;
};
