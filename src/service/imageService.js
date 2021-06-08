
const Image = require("../model/Image");
const patientService = require("../service/patientService");
const userService = require("../service/userService");
module.exports = {
    async createImageUser(req, res) {
        const {
            originalname: name,
            size,
            key,
            location: url = ""
        } = req.file;

        const id = req.headers.userid

        if (id) {
            const image = await Image.create({
                name,
                size,
                key,
                url,
                user: req.headers.userid
            });

            if (image) {
                const user = await userService.findById(req.headers.userid);
                if (user) {
                    user.image = image._id;
                    await user.save();
                    return res.status(204).send();
                }
            }

        }


        return res.status(500).json({ message: 'Some error occurred while upload image.' })
    },
    async findAllImagesByUser(req, res) {
        const images = await Image.find({
            user: req.userId
        });

        return res.json(images);
    },

    async removeImage(req, res) {
        const id = req.params.id;

        const image = await Image.findById(id);
        if (!image) {
            res.status(404).send();
        }
        await image.remove();
        return res.status(204).send();
    },

    async createImagePatient(req, res) {
        const {
            originalname: name,
            size,
            key,
            location: url = ""
        } = req.file;


        const id = req.headers.patientid

        if (id) {
            const imageExist = await Image.findOne({ patient: id });
            if (imageExist) {
                await imageExist.remove();
            }

            const image = await Image.create({
                name,
                size,
                key,
                url,
                user: req.userId,
                patient: req.headers.patientid
            });

            if (image) {
                const patient = await patientService.findByIdImage(req, res);
                if (patient) {
                    patient.image = image._id;
                    await patient.save();
                    return res.status(204).send();
                }
            }
        }


        return res.status(500).json({ message: 'Some error occurred while upload image.' })
    }
}