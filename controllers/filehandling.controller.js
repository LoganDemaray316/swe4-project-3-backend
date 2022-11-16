const { sequelize } = require("../models");
const db = require("../models");

const Buildings = db.buildings;
const Faculty = db.faculty;
const Rooms = db.rooms;
const Sections = db.sections;
const SectionTime = db.sectiontime;
const Semesters = db.semesters;

exports.parseFile = async (req, res) => {
  let data = [];
  await req.params.import;
  data = req.params.import;
  console.log("START");
  console.log("Data:" + data);

  for (let i = 0; i < data.length; i++) {
    let temp = {};
    console.log(temp);
    temp.name = data[i]["Bldg"];
    Buildings.create(temp);
    console.log(temp);
    temp = {};
    temp.name = data[i]["Faculty First"] + " " + data[i]["Faculty Last"];
    Faculty.create(temp);
    console.log(temp);
    temp = {};
    temp.code = data[i]["Term"];
    temp.startDate = data[i]["Start Date"];
    temp.endDate = data[i]["End Date"];
    Semesters.create(temp);
    console.log(temp);
    temp = {};
    temp.room = data[i]["Rooms"];
    temp.buildingId = sequelize.query(
      `select id from buildings where name like ${data[i]["Bldg"]}`
    );
    Rooms.create(temp);
    console.log(temp);
    temp = {};
    temp.number =
      data[i]["Subject"] +
      "-" +
      data[i]["Course #"] +
      "-" +
      data[i]["Section #"];
    temp.courseId = sequelize.query(
      `select id from courses where number like ${
        data[i]["Subject"] + "-" + data[i]["Course #"]
      }`
    );
    temp.capacity = parseInt(data[i]["Capacity"]);
    temp.semesterId = sequelize.query(
      `select id from semesters where code like ${data[i]["Term"]}`
    );
    Sections.create(temp);
    console.log(temp);
    temp = {};
    temp = {};
    temp.sectionId = sequelize.query(
      `select id from sections where number like ${
        data[i]["Subject"] +
        "-" +
        data[i]["Course #"] +
        "-" +
        data[i]["Section #"]
      }`
    );
    temp.startTime = data[i]["Start Time"];
    temp.endTime = data[i]["End Time"];
    temp.startDate = data[i]["Start Date"];
    temp.endDate = data[i]["End Date"];
    temp.daysOfWeek = data[i]["Days"];
    temp.roomId = sequelize.query(
      `select rooms.id from rooms join buildings on buildings.id = rooms.buildingId where rooms.number like ${data[i]["Room"]} and buildings.name like ${data[i]["Bldg"]}`
    );
    temp.facultyId = sequelize.query(
      `select id from faculties where name like ${
        data[i]["Faculty First"] + " " + data[i]["Faculty Last"]
      }`
    );
    SectionTime.create(temp);
    console.log(temp);
    temp = {};
  }
  console.log("END");
  res.status(200).send({});
};
