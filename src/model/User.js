const mongoose = require("mongoose");
const bcryptService = require("../service/BcryptService");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false,
    }
}, {
    timestamps: true
});


UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  

module.exports = mongoose.model('User', UserSchema)