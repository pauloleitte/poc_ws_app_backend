const jwtService = require("../service/JwtService");
const mailService = require('../service/mailService');
const bcryptService = require("../service/BcryptService");
const crypto = require('crypto');
const User = require('../model/User');
const Image = require("../model/Image");

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
        var createUser = await User.create({
            name: name,
            email: email,
            password: await bcryptService.encrypt(password),
        })
        return res.status(201).json(
            {
                name: name,
                id: createUser.id,
                email: createUser.email
            }
        )
    },
    async login(req, res) {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email: email
        }).populate('image');

        if (user) {
            if (await bcryptService.compare(password, user.password)) {
                var token = await jwtService.generate(user.id)
                return res.status(200).json({
                    auth: true,
                    token: token,
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.image.url
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

    async findById(id) {
        return await User.findById(id);
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