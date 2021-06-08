const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./multer");
const imageController = require("../controller/imageController");
const jwtService = require("../service/jwtService");

routes.post("/images-user", multer(multerConfig).single("file"), imageController.createImageUser);
routes.get("/images", jwtService.validate, imageController.findAllImagesByUser);
routes.post("/images-patient", jwtService.validate, multer(multerConfig).single("file"), imageController.createImagePatient);
routes.delete("/images/:id", jwtService.validate, imageController.removeImage);

module.exports = routes;