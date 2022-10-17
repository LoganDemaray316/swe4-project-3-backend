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
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return Faculty;
};
