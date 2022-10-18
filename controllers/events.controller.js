const db = require("../models");
const Events = db.events;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Events } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Events, totalPages, currentPage };
};

//Add an event to the database
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!",
    });
  }

  const events = {
    semesterID: req.body.semesterID,
    userID: req.body.userID,
    name: req.body.name,
    roomID: req.body.roomID,
  };

  Events.create(events)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the events in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Events.findAndCountAll({ limit, offset })
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

//Find an event based on a specific semesterID
exports.findSemesterID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const semesterID = req.params.semesterID;
  Events.findAndCountAll({
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
          message: `Cannot find events with semesterID=${semesterID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving event with semesterID=" + semesterID,
      });
    });
};

//Find an event based on a specific userID
exports.findUserID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const userID = req.params.userID;
  Events.findAndCountAll({
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
          message: `Cannot find events with userID=${userID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving event with userID=" + userID,
      });
    });
};

//Find an event based on a specific name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Events.findAndCountAll({
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
          message: `Cannot find events with name=${name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving event with name=" + name,
      });
    });
};

//Find an event based on a specific roomID
exports.findRoomID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const roomID = req.params.roomID;
  Events.findAndCountAll({
    where: { roomID: roomID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find events with roomID=${roomID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving event with roomID=" + roomID,
      });
    });
};

//Update an event using the id
exports.update = (req, res) => {
  const id = req.params.id;
  Events.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update event with id=${id}. Maybe event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating event with id=" + id,
      });
    });
};

//Delete an event using the event id
exports.delete = (req, res) => {
  const id = req.params.id;
  Events.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete event with event id=${id}. Maybe event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete event with event id=" + id,
      });
    });
};
