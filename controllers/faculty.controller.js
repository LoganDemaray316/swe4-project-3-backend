const db = require("../models");
const Faculty = db.faculty;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Faculty } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Faculty, totalPages, currentPage };
};

//Add a faculty member to the database
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!",
    });
  }

  const faculty = {
    name: req.body.name,
  };

  Faculty.create(faculty)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the faculty members in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Faculty.findAndCountAll({ limit, offset })
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

//Find a faculty member based on a specific name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Faculty.findAndCountAll({
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
          message: `Cannot find faculty member with name=${name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving faculty member with name=" + name,
      });
    });
};

//Delete a faculty member using the faculty id
exports.delete = (req, res) => {
  const id = req.params.id;
  Faculty.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete event with faculty id=${id}. Maybe faculty member was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete faculty with faculty id=" + id,
      });
    });
};
