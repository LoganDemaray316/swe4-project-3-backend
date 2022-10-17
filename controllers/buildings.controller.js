const db = require("../models");
const Buildings = db.buildings;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Buildings } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Buildings, totalPages, currentPage };
};

//Add a building to the database
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!",
    });
  }

  const buildings = {
    name: req.body.name,
  };

  Buildings.create(buildings)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the buildings in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Buildings.findAndCountAll({ limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something happend, try again!",
      });
    });
};

//Find a building based on the name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Buildings.findAndCountAll({
    where: { name: name },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find building with name=${name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving building with name=" + name,
      });
    });
};

//Delete a building using the building id
exports.delete = (req, res) => {
  const id = req.params.id;
  Buildings.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Building was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete building with building id=${id}. Maybe building was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete building with building id=" + id,
      });
    });
};
