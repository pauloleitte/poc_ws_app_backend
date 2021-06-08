const service = require("../service/imageService");

module.exports = {
    async createImageUser(req, res) {
        return service.createImageUser(req, res);
    },

    async findAllImagesByUser(req, res) {
        return service.findAllImagesByUser(req, res);
    },

    async findImageByPatient(req, res) {
        return service.findImageByPatient(req, res)
    },

    async removeImage(req, res) {
        return service.removeImage(req, res)
    },

    async createImagePatient(req, res) {
        return service.createImagePatient(req, res);
    }
}