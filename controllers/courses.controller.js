const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Courses } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Courses, totalPages, currentPage };
};

//Add a course to the database
exports.create = (req, res) => {
  if (!req.body.number) {
    res.status(400).send({
      message: "Number cannot be empty!",
    });
  }

  const courses = {
    number: req.body.number,
    name: req.body.name,
    description: req.body.description,
    hours: req.body.hours,
    level: req.body.level,
    yearAvailable: req.body.yearAvailable,
    semesterAvailable: req.body.semesterAvailable,
  };

  Courses.create(courses)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the courses in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Courses.findAndCountAll({ limit, offset })
    .then((data) => {
      const respons = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something happend, try again!",
      });
    });
};

exports.findOne = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const number = req.params.number;
  Courses.findAndCountAll({
    where: { number: number },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with course number=${number}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with course number=" + number,
      });
    });
};

//Update a course using the course number
exports.update = (req, res) => {
  const number = req.params.number;
  Courses.update(req.body, {
    where: { number: number },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Course with course number=${number}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Course with course number=" + number,
      });
    });
};

//Delete a course using the course number
exports.delete = (req, res) => {
  const number = req.params.number;
  Courses.destroy({
    where: { number: number },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Course with course number=${number}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Course with course number=" + number,
      });
    });
};
