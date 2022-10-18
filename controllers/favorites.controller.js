const db = require("../models");
const Favorites = db.favorites;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Favorites } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Favorites, totalPages, currentPage };
};

//Add a favorite to the database
exports.create = (req, res) => {
  if (!req.body.userID) {
    res.status(400).send({
      message: "UserID cannot be empty!",
    });
  }

  const favorites = {
    courseID: req.body.courseID,
    userID: req.body.userID,
  };

  Favorites.create(favorites)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the favorites in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Favorites.findAndCountAll({ limit, offset })
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

//Find a favorite based on a specific userID
exports.findUserID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const userID = req.params.userID;
  Favorites.findAndCountAll({
    where: { userID: userID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find favorite with userID=${userID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving favorite with userID=" + userID,
      });
    });
};

//Find a favorite based on a specific courseID
exports.findCourseID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const courseID = req.params.courseID;
  Favorites.findAndCountAll({
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
          message: `Cannot find favorite with courseID=${courseID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving favorite with courseID=" + courseID,
      });
    });
};

//Update a favorite using the id
exports.update = (req, res) => {
  const id = req.params.id;
  Favorites.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Favorite was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update favorite with id=${id}. Maybe favorite was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating favorite with id=" + id,
      });
    });
};

//Delete a favorite using the favorite id
exports.delete = (req, res) => {
  const id = req.params.id;
  Favorites.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete favorite with id=${id}. Maybe favorite was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete favorite with id=" + id,
      });
    });
};
