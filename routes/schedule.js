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
