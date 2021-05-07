const Patient = require("../model/Patient");
module.exports = {

    async create(patient) {
        try {
            return await Patient.create(patient);
        } catch (e) {
            throw e;
        }
    },

    async findById(id) {
        return await Patient.findById(id)
    },

    async findByIdAndRemove(id) {
        try {
            return await Patient.findByIdAndRemove(id).exec();
        } catch (e) {
            throw e;
        }
    },

    async findByIdAndUpdate(id, patient) {
        try {
            return await Patient.findByIdAndUpdate(id, { $set: patient }, { new: true });
        } catch (e) {
            throw e;
        }
    },

    async findAll(userId) {
        return await Patient.find({
            userId: userId
        });
    },

    async findOneByCpf(cpf, userId) {
        return await Patient.findOne({
            cpf: cpf,
            userId: userId,
        })
    }

}