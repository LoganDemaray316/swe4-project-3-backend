const { sequelize } = require("../models");
const db = require("../models");

const Buildings = db.buildings;
const Faculty = db.faculty;
const Rooms = db.rooms;
const Sections = db.sections;
const SectionTime = db.sectiontime;
const Semesters = db.semesters;

function parseFile(file) {
  const data = $.csv.toObjects(file);

  for (let i = 0; i < data.length; i++) {
    delete data[i]["Synonym"];
    delete data[i]["UG/GR"];
    delete data[i]["Section Number"];
    delete data[i]["Crs Level"];
    delete data[i]["Section Title"];
    delete data[i]["Course Type"];
    delete data[i]["Reg Restrictions"];
    delete data[i]["Faculty Name (LFM)"];
    delete data[i]["Faculty Name 2 (LFM)"];
    delete data[i]["Sec Start Date"];
    delete data[i]["Meeting Start Date"];
    delete data[i]["Sec End Date"];
    delete data[i]["Meeting End Date"];
    delete data[i]["Academic Year"];
    delete data[i]["Sec Num Of"];
    delete data[i]["Min Cred"];
    delete data[i]["Max Cred"];
    delete data[i]["Enr Count"];
    delete data[i]["Wait"];
    delete data[i]["Depts"];
    delete data[i]["Divisions"];
    delete data[i]["College"];
    delete data[i]["Instr Method"];
    delete data[i]["Sun"];
    delete data[i]["Mon"];
    delete data[i]["Tue"];
    delete data[i]["Wed"];
    delete data[i]["Thu"];
    delete data[i]["Fri"];
    delete data[i]["Sat"];
    delete data[i]["SEC.XLIST"];
    delete data[i]["SEC.FEE"];
    delete data[i]["SEC.COMMENTS"];
    delete data[i]["SEC.PRINTED.COMMENTS"];
    delete data[i]["Primary Section"];
    delete data[i]["Term Sort No"];
    delete data[i]["Only Pass/NoPass"];
    delete data[i]["Allow Pass/NoPass"];
    delete data[i]["Start Time 24hr"];
    delete data[i]["End Time 24hr"];
  }

  for (let i = 0; i < data.length; i++) {
    let temp = {};

    temp.name = data[i]["Bldg"];

    if (!temp === {}) {
      Buildings.create(temp);
      temp = {};
    }
    temp.name = data[i]["Faculty First"] + " " + data[i]["Faculty Last"];
    if (!temp === {}) {
      Faculty.create(temp);
      temp = {};
    }
    temp.code = data[i]["Term"];
    temp.startDate = data[i]["Start Date"];
    temp.endDate = data[i]["End Date"];
    if (!temp === {}) {
      Semesters.create(temp);
      temp = {};
    }
    temp.room = data[i]["Rooms"];
    temp.buildingId = sequelize.query(
      `select id from buildings where name like ${data[i]["Bldg"]}`
    );
    if (!temp === {}) {
      Rooms.create(temp);
      temp = {};
    }
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
    if (!temp === {}) {
      Sections.create(temp);
      temp = {};
    }
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
    if (!temp === {}) {
      SectionTime.create(temp);
      temp = {};
    }
  }
}
