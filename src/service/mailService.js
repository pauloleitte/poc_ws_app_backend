const mailer = require('../config/mailer');

module.exports = {
    async sendMail(email, token, req, res) {
        mailer.sendMail({
            to: email,
            from: 'paulo.leitte@live.com',
            subject: 'Reset Password',
            template: 'auth/forgot-password',
            context: {
                token
            }
        }, (error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    message: 'Ocorreu um erro ao tentar recuperar a senha, tente novamente.'
                })
            }
            return res.status(204).send()
        })
    }
}