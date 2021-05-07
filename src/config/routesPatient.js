const express = require("express");
const patientController = require("../controller/patientController");

const routes = express.Router();

routes.get("/patients", patientController.findAll)
routes.get("/patients/:id", patientController.findById)
routes.post("/patients", patientController.create)
routes.delete("/patients/:id",  patientController.delete)
routes.put("/patients/:id", patientController.update)


module.exports = routes;



