const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    naturalness: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    rg: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Patient", PatientSchema);