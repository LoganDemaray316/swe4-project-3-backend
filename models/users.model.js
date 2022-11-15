const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      /*facultyID: {
        type: Sequelize.INTEGER,
      },*/
      email: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return Users;
};
