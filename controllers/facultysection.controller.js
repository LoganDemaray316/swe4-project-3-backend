const db = require("../models");
const FacultySection = db.facultysection;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: FacultySection } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, FacultySection, totalPages, currentPage };
};

//Add a faculty section to the database
exports.create = (req, res) => {
  if (!req.body.facultyID) {
    res.status(400).send({
      message: "FacultyID cannot be empty!",
    });
  }

  const facultysection = {
    facultyID: req.body.facultyID,
    sectionID: req.body.sectionID,
  };

  FacultySection.create(facultysection)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the faculty sections in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  FacultySection.findAndCountAll({ limit, offset })
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

//Find a faculty sections based on a specific facultyID
exports.findFacultyID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const facultyID = req.params.facultyID;
  FacultySection.findAndCountAll({
    where: { facultyID: facultyID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find faculty sections with facultyID=${facultyID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving faculty section with facultyID=" + facultyID,
      });
    });
};

//Find a faculty sections based on a specific sectionID
exports.findSectionID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const sectionID = req.params.sectionID;
  FacultySection.findAndCountAll({
    where: { sectionID: sectionID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find faculty sections with sectionID=${sectionID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving faculty section with sectionID=" + sectionID,
      });
    });
};

//Delete a faculty section using the faculty section id
exports.delete = (req, res) => {
  const id = req.params.id;
  FacultySection.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faculty Section was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete faculty section with id=${id}. Maybe faculty section was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete faculty section with id=" + id,
      });
    });
};
