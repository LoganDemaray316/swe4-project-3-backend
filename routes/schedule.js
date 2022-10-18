module.exports = (app) => {
  //A variable for each controller for the API to use
  const buildings = require("../controllers/buildings.controller.js");
  const courses = require("../controllers/courses.controller.js");
  const events = require("../controllers/events.controller.js");
  const faculty = require("../controllers/faculty.controller.js");
  const facultysection = require("../controllers/facultysection.controller");
  const favorites = require("../controllers/favorites.controller.js");
  const rooms = require("../controllers/rooms.controller.js");
  const sections = require("../controllers/sections.controller.js");
  const sectiontime = require("../controllers/sectiontime.controller.js");
  const semesters = require("../controllers/semesters.controller.js");
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  /*
  The functions that can be done with the router/API
  router.post();
  router.put();
  router.get();
  router.delete();
  */

  //Buildings
  router.post("/buildings", buildings.create);
  router.put("/buildings/:id", buildings.update);
  router.get("/buildings", buildings.findAll);
  router.get("/buildings/name/:name", buildings.findName);
  router.delete("/buildings:id", buildings.delete);

  //Courses
  router.post("/courses", courses.create);
  router.put("/courses/:id", courses.update);
  router.get("/courses", courses.findAll);
  router.get("/courses/description/:description", courses.findDescription);
  router.get("/courses/hours/:hours", courses.findHours);
  router.get("/courses/level/:level", courses.findLevel);
  router.get("/courses/name/:name", courses.findName);
  router.get("/courses/number/:number", courses.findNumber);
  router.get(
    "/courses/semesteravailable/:semesteravailable",
    courses.findSemesterAvailable
  );
  router.get(
    "/courses/yearavailable/:yearavailable",
    courses.findYearAvailable
  );
  router.get("/courses/searcheverything", courses.searchEverything);
  router.delete("/courses:id", courses.delete);

  //Events
  router.post("/events", events.create);
  router.put("/events/:id", events.update);
  router.get("/events", events.findAll);
  router.get("/events/name/:name", events.findName);
  router.get("/events/roomid/:roomid", events.findRoomID);
  router.get("/events/semesterid/:semesterid", events.findSemesterID);
  router.get("/events/userid/:userid", events.findUserID);
  router.delete("/events:id", events.delete);

  //Faculty
  router.post("/faculty", faculty.create);
  router.put("/faculty/:id", faculty.update);
  router.get("/faculty", faculty.findAll);
  router.get("/faculty/name/:name", faculty.findName);
  router.delete("/faculty/:id", faculty.delete);

  //Faculty Section
  router.post("/facultysection", facultysection.create);
  router.put("/facultysection:id", facultysection.update);
  router.get("/facultysection", facultysection.findAll);
  router.get(
    "/facultysection/facultyid/:facultyid",
    facultysection.findFacultyID
  );
  router.get(
    "/facultysection/sectionid/:sectionid",
    facultysection.findSectionID
  );
  router.delete("/facultysection/:id", facultysection.delete);

  //Favorites
  router.post("/favorites", favorites.create);
  router.put("/favorites/:id", favorites.update);
  router.get("/favorites", favorites.findAll);
  router.get("/favorites/courseid/:courseid", favorites.findCourseID);
  router.get("/favorites/userid/:userid", favorites.findUserID);
  router.delete("/favorites/:id", favorites.delete);

  //Rooms
  router.post("/rooms", rooms.create);
  router.put("/rooms/:id", rooms.update);
  router.get("/rooms", rooms.findAll);
  router.get("/rooms/buildingid/:buildingid", rooms.findBuildingID);
  router.get("/rooms/capacity/:capacity", rooms.findCapacity);
  router.get("/rooms/number/:number", rooms.findNumber);
  router.delete("/rooms/:id", rooms.delete);

  //Sections
  router.post("/sections", sections.create);
  router.put("/sections/:id", sections.update);
  router.get("/sections", sections.findAll);
  router.get("/sections/courseid/:courseid", sections.findCourseID);
  router.get("/sections/semesterid/:semesterid", sections.findSemesterID);
  router.delete("/sections/:id", sections.delete);

  //Section Time
  router.post("/sectiontime", sectiontime.create);
  router.put("/sectiontime/:id", sectiontime.update);
  router.get("/sectiontime", sectiontime.findAll);
  router.get("sectiontime/daysofweek/:daysofweek", sectiontime.findDaysOfWeek);
  router.get("/sectiontime/enddate/:enddate", sectiontime.findEndDate);
  router.get("/sectiontime/endtime/:endtime", sectiontime.findEndTime);
  router.get("/sectiontime/roomid/:roomid", sectiontime.findRoomID);
  router.get("/sectiontime/sectionid/:sectionid", sectiontime.findSectionID);
  router.get("/sectiontime/startdate/:startdate", sectiontime.findStartDate);
  router.get("/sectiontime/starttime/:starttime", sectiontime.findStartTime);
  router.delete("/sectiontime/:id", sectiontime.delete);

  //Semesters
  router.post("/semesters", semesters.create);
  router.put("/semesters/:id", semesters.update);
  router.get("/semesters", semesters.findAll);
  router.get("/semesters/code/:code", semesters.findCode);
  router.get("/semesters/enddate/:enddate", semesters.findEndDate);
  router.get("/semesters/startdate/:startdate", semesters.findStartDate);
  router.delete("/semesters/:id", semesters.delete);

  //Users
  router.post("/users", users.create);
  router.put("/users/:id", users.update);
  router.get("/users", users.findAll);
  router.get("/users/email/:email", users.findEmail);
  router.get("/users/facultyid/:facultyid", users.findFacultyID);
  router.get("/users/role/:role", users.findRole);
  router.delete("/users/:id", users.delete);

  //The route that the API uses
  app.use("/schedule-t3", router);
};
