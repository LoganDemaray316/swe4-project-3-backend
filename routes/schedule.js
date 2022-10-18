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
  router.put("/buildings", buildings.update);
  router.get("/buildings", buildings.findAll);
  router.get("/buildings/name/:name", buildings.findName);
  router.delete("/buildings", buildings.delete);

  //Courses
  router.post("/courses", courses.create);
  router.put("/courses", courses.update);
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
  router.delete("/courses", courses.delete);

  //Events
  router.post();
  router.put();
  router.get();
  router.delete();

  //Faculty
  router.post();
  router.put();
  router.get();
  router.delete();

  //Faculty Section
  router.post();
  router.put();
  router.get();
  router.delete();

  //Favorites
  router.post();
  router.put();
  router.get();
  router.delete();

  //Rooms
  router.post();
  router.put();
  router.get();
  router.delete();

  //Sections
  router.post();
  router.put();
  router.get();
  router.delete();

  //Section Time
  router.post();
  router.put();
  router.get();
  router.delete();

  //Semesters
  router.post();
  router.put();
  router.get();
  router.delete();

  //Users
  router.post();
  router.put();
  router.get();
  router.delete();

  //The route that the API uses
  app.use("/schedule-t3", router);
};
