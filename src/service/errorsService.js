const _ = require('lodash')
module.exports = {
    sendErrors(req, res, e) {
        const bundle = e.errors
        if (bundle) {
            const errors = []
            _.forIn(bundle, error => errors.push(error.message))
            return res.status(500).json({
                errors
            })
        }
    },

}