const service = require("../service/patientService")


module.exports = {
    async create(req, res) {
        return service.create(req,res);
    },

    async delete(req, res) {
        return service.findByIdAndRemove(req, res);
    },

    async update(req, res) {
        return service.findByIdAndUpdate(req, res);
    },

    async findById(req, res) {
        return service.findById(req, res);
    },
    async findAll(req , res){
        return service.findAll(req, res);
    }
}
