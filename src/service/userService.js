const jwtService = require("../service/JwtService");
const mailService = require('../service/mailService');
const bcryptService = require("../service/BcryptService");
const crypto = require('crypto');
const User = require('../model/User');

module.exports = {
    async signup(req, res) {
        const {
            name,
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email: email
        })
        if (user) {
            return res.status(400).json({
                message: 'Usuário já se encontra cadastrado.'
            })
        }
        await User.create({
            name: name,
            email: email,
            password: password,
        })
        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso.'
        })
    },
    async login(req, res) {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email: email
        })
        if (user) {
            if (await bcryptService.compare(password, user.password)) {
                var token = await jwtService.generate(user.id)
                return res.status(200).json({
                    auth: true,
                    token: token,
                    user: user.name
                });
            }
        }
        return res.status(400).json({
            message: 'E-mail ou Senha Inválidos.'
        })
    },
    async forgotPassword(req, res) {
        const {
            email
        } = req.body;
        try {

            const user = await User.findOne({
                email: email
            })
            if (!user) {
                return res.status(400).json({
                    message: 'Usuário não encontrado.'
                })
            }

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            return mailService.sendMail(email, token, req, res);

        } catch (e) {
            return res.status(500).json({
                message: 'Ocorreu um erro ao tentar recuperar a senha, tente novamente.'
            })
        }
    },

    async resetPassword(req, res) {
        const {
            email,
            token,
            password
        } = req.body;

        try {

            const user = await User.findOne({
                email: email
            }).select('+passwordResetToken passwordResetExpires')


            if (!user) {
                return res.status(400).json({
                    message: 'Usuário não encontrado.'
                })
            }

            if (token !== user.passwordResetToken) {
                return res.status(400).json({
                    message: 'Token inválido.'
                })
            }

            const now = Date.now();

            if (now > user.passwordResetExpires) {
                return res.status(400).json({
                    message: 'Token vencido, gere um novo token.'
                })
            }

            user.password = password;
            user.passwordResetToken = '';
            user.passwordResetExpires = '';

            user.save();

            return res.status(204).send();

        } catch (e) {
            return res.status(500).json({
                message: 'Ocorreu um erro ao tentar resetar a senha, tente novamente.'
            })
        }
    }
}