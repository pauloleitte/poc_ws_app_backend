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
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    this.password = await bcryptService.encrypt(this.password)
    next();
})

module.exports = mongoose.model('User', UserSchema)