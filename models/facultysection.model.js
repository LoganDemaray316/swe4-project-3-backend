const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const FacultySection = sequelize.define(
    "facultysection",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
  return FacultySection;
};
