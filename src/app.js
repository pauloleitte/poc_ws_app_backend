const express = require("express");
const cors = require("cors")
const morgan = require('morgan')
const path = require("path");
const constants = require("./constants/constant")
const routesAuth = require("./config/routesAuth");
const routesPatient = require("./config/routesPatient")
const routesImage = require("./config/routesImage")
const jwtService = require("./service/jwtService");

require('./config/database')

const app = express();
app.use(morgan('dev'))
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}))
app.use(express.json())
app.use(
    "/api/v1/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
app.use('/api/v1', routesAuth)
app.use('/api/v1', routesImage)
app.use('/api/v1', jwtService.validate, routesPatient)


app.listen(constants.PORT, function () {
    console.log(`server running in port ${constants.PORT}`)
})