const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Faculty = sequelize.define(
    "faculty",
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
  return Faculty;
};
