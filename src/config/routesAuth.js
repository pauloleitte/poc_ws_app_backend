const express = require("express");
const userController = require("../controller/userController");

const routes = express.Router();

//routes login
routes.post("/signup", userController.signup)
routes.post("/login", userController.login)
routes.post('/forgot-password', userController.forgotPassword)
routes.post('/reset-password', userController.resetPassword)

module.exports = routes;