const db = require("../models");
const Sections = db.sections;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Sections } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Sections, totalPages, currentPage };
};

//Add a section to the database
exports.create = (req, res) => {
  if (!req.body.courseID) {
    res.status(400).send({
      message: "courseID cannot be empty!",
    });
  }

  const sections = {
    courseID: req.body.courseID,
    semesterID: req.body.semesterID,
    number: req.body.number,
    capacity: req.body.capacity,
  };

  Sections.create(sections)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the sections in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Sections.findAndCountAll({ limit, offset })
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

//Find a section based on a specific courseID
exports.findCourseID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const courseID = req.params.courseID;
  Sections.findAndCountAll({
    where: { courseID: courseID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find section with courseID=${courseID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section with courseID=" + courseID,
      });
    });
};

//Find a section based on a specific semesterID
exports.findSemesterID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const semesterID = req.params.semesterID;
  Sections.findAndCountAll({
    where: { semesterID: semesterID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find section with semesterID=${semesterID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section with semesterID=" + semesterID,
      });
    });
};

//Find a section based on a specific number
exports.findSemesterID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const number = req.params.number;
  Sections.findAndCountAll({
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
          message: `Cannot find section with number=${number}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section with number=" + number,
      });
    });
};

//Find a section based on a specific capacity
exports.findSemesterID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const capacity = req.params.capacity;
  Sections.findAndCountAll({
    where: { capacity: capacity },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find section with capacity=${capacity}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section with capacity=" + capacity,
      });
    });
};

//Update a section using the id
exports.update = (req, res) => {
  const id = req.params.id;
  Sections.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Section was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update section with id=${id}. Maybe section was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating section with id=" + id,
      });
    });
};

//Delete a section using the section id
exports.delete = (req, res) => {
  const id = req.params.id;
  Sections.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Section was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete section with section id=${id}. Maybe section was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete section with section id=" + id,
      });
    });
};
