const db = require("../models");
const Rooms = db.rooms;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Rooms } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Rooms, totalPages, currentPage };
};

//Add a room to the database
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!",
    });
  }

  const rooms = {
    number: req.body.number,
    capacity: req.body.capacity,
    buildingID: req.body.buildingID,
  };

  Rooms.create(rooms)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the rooms in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Rooms.findAndCountAll({ limit, offset })
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

//Find an room based on a specific number
exports.findNumber = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const number = req.params.number;
  Rooms.findAndCountAll({
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
          message: `Cannot find room with number=${number}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving room with number=" + number,
      });
    });
};

//Find an room based on a specific capacity
exports.findCapacity = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const capacity = req.params.capacity;
  Rooms.findAndCountAll({
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
          message: `Cannot find room with capacity=${capacity}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving room with capacity=" + capacity,
      });
    });
};

//Find an room based on a specific buildingID
exports.findBuildingID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const buildingID = req.params.buildingID;
  Rooms.findAndCountAll({
    where: { buildingID: buildingID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find room with buildingID=${buildingID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving room with buildingID=" + buildingID,
      });
    });
};

//Update a room using the id
exports.update = (req, res) => {
  const id = req.params.id;
  Rooms.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Room was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update room with id=${id}. Maybe room was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating room with id=" + id,
      });
    });
};

//Delete a room using the room id
exports.delete = (req, res) => {
  const id = req.params.id;
  Rooms.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Room was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete room with id=${id}. Maybe room was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete room with id=" + id,
      });
    });
};
