const db = require("../models");
const SectionTime = db.sectiontime;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: SectionTime } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, SectionTiome, totalPages, currentPage };
};

//Add a section time to the database
exports.create = (req, res) => {
  if (!req.body.sectionID) {
    res.status(400).send({
      message: "SectionID cannot be empty!",
    });
  }

  const sectiontime = {
    sectionID: req.body.sectionID,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    daysOfWeek: req.body.daysOfWeek,
    roomID: req.body.roomID,
  };

  SectionTime.create(sectiontime)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the section times in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  SectionTime.findAndCountAll({ limit, offset })
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

//Find a section time based on a specific sectionID
exports.findSectionID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const sectionID = req.params.sectionID;
  SectionTime.findAndCountAll({
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
          message: `Cannot find section time with sectionID=${sectionID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section time with sectionID=" + sectionID,
      });
    });
};

//Find a section time based on a specific start time
exports.findStartTime = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const startTime = req.params.startTime;
  SectionTime.findAndCountAll({
    where: { startTime: startTime },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find section time with start time=${startTime}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section time with start time=" + startTime,
      });
    });
};

//Find a section time based on a specific end time
exports.findEndTime = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const endTime = req.params.endTime;
  SectionTime.findAndCountAll({
    where: { endTime: endTime },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find section time with end time=${endTime}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section time with end time=" + endTime,
      });
    });
};

//Find a section time based on a specific start date
exports.findStartDate = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const startDate = req.params.startDate;
  SectionTime.findAndCountAll({
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
          message: `Cannot find section time with start date=${startDate}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section time with start date=" + startDate,
      });
    });
};

//Find a section time based on a specific end date
exports.findEndDate = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const endDate = req.params.endDate;
  SectionTime.findAndCountAll({
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
          message: `Cannot find section time with end date=${endDate}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section time with end date=" + endDate,
      });
    });
};

//Find a section time based on a specific days of the week
exports.findDaysOfWeek = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const daysOfWeek = req.params.daysOfWeek;
  SectionTime.findAndCountAll({
    where: { daysOfWeek: daysOfWeek },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find section time with days of week=${daysOfWeek}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving section time with days of week=" + daysOfWeek,
      });
    });
};

//Find a section time based on a specific roomID
exports.findRoomID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const roomID = req.params.roomID;
  SectionTime.findAndCountAll({
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
          message: `Cannot find section time with roomID=${roomID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section time with roomID=" + roomID,
      });
    });
};

//Update a section time using the id
exports.update = (req, res) => {
  const id = req.params.id;
  SectionTime.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Section time was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update section time with id=${id}. Maybe section time was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating section time with id=" + id,
      });
    });
};

//Delete a section time using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  SectionTime.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Section Time was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Section Time with id=${id}. Maybe Section Time was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete section time with event id=" + id,
      });
    });
};
