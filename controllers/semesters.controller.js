const db = require("../models");
const Semesters = db.semesters;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Semesters } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Semesters, totalPages, currentPage };
};

//Add a semester to the database
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!",
    });
  }

  const semesters = {
    code: req.body.code,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  Semesters.create(semesters)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the semesters in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Semesters.findAndCountAll({ limit, offset })
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

//Find a semester based on a specific code
exports.findCode = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const code = req.params.code;
  Semesters.findAndCountAll({
    where: { code: code },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find semester with code=${code}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving semester with code=" + code,
      });
    });
};

exports.findStartDate = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const startDate = req.params.startDate;
  Semesters.findAndCountAll({
    where: { startDate: startDate },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find semester with start date=${startDate}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving semester with start date=" + startDate,
      });
    });
};

exports.findEndDate = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const endDate = req.params.endDate;
  Semesters.findAndCountAll({
    where: { endDate: endDate },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find semester with end date=${endDate}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving semester with end date=" + endDate,
      });
    });
};

//Delete a semester using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Semesters.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete semester with id=${id}. Maybe semester was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete semester with id=" + id,
      });
    });
};
