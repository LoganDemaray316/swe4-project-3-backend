const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Semesters = sequelize.define(
    "semesters",
    {
      code: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      endDate: {
        type: Sequelize.STRING,
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
  return Semesters;
};
