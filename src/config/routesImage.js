const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./multer");

const Image = require("../model/Image");

routes.get("/images", async (req, res) => {
    const images = await Image.find({
        userId: req.userId
    });

    return res.json(images);
});

routes.post("/images", multer(multerConfig).single("file"), async (req, res) => {
    const {
        originalname: name,
        size,
        key,
        location: url = ""
    } = req.file;

    const image = await Image.create({
        name,
        size,
        key,
        url,
        userId: req.userId
    });

    return res.json(image);
});

routes.delete("/images/:id", async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
        res.status(404).send();
    }
    await image.remove();
    return res.status(204).send();
});

module.exports = routes;