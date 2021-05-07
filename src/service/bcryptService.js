require('dotenv').config()
const bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync(10)

module.exports = {
    async encrypt(password) {
        return bcrypt.hashSync(password, salt)
    },
    async compare(password, passwordD) {
        return bcrypt.compare(password, passwordD)
    },
}