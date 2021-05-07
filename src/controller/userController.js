const userService = require('../service/userService');
module.exports = {

    async signup(req, res) {
        return userService.signup(req, res);
    },
    async login(req, res) {
        return userService.login(req, res)
    },
    async forgotPassword(req, res) {
        return userService.forgotPassword(req, res);
    },
    async resetPassword(req, res){
        return userService.resetPassword(req,res);
    }

}