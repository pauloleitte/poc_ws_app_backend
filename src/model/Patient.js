const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false,
    }
}, {
    timestamps: true
});

PatientSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

PatientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Patient", PatientSchema);