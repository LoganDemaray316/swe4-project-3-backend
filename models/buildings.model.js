const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Buildings = sequelize.define(
    "buildings",
    {
      name: {
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
  return Buildings;
};
