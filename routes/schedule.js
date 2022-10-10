module.exports = (app) => {
  //const courses = require("../controllers/courses.controller.js");
  var router = require("express").Router();

  //The route that the API uses
  app.use("/schedule-t3", router);
};
