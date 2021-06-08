const Patient = require("../model/Patient");
const errorService = require("../service/errorsService");

const optionPopulateImage = {
    path: 'image',
    model: 'Image',
    select: 'url'
}

module.exports = {
    async create(req, res) {
        const patient = req.body;
        patient.user = req.userId;
        try {
            const exist = await this.findOneByCpf(patient.cpf, patient.userId);
            if (!exist) {
                return res.status(201).json(
                    await Patient.create(patient)
                );
            }
            return res.status(400).json({
                message: 'Paciente já cadastrado.'
            });
        } catch (e) {
            return errorService.sendErrors(req, res, e);
        }
    },

    async findById(req, res) {
        const id = req.params.id
        const patient = await Patient.findById(id);
        if (patient) {
            return res.json(patient)
        } else {
            return res.status(404).send({
                message: 'Paciente não localizado.'
            });
        }
    },

    async findByIdImage(req, res) {
        const id = req.headers.patientid
        return await Patient.findById(id);
    },

    async findByIdAndRemove(req, res) {
        const id = req.params.id
        try {
            const exist = await Patient.findById(id).populate('image');
            if (exist) {
                await Patient.findByIdAndRemove(id).exec();
                return res.status(204).send();
            }
            return res.status(404).json({
                message: 'Paciente não localizada.'
            })
        } catch (e) {
            return errorService.sendErrors(req, res, e);
        }
    },

    async findByIdAndUpdate(req, res) {
        const patient = req.body;
        const id = req.params.id
        try {
            const exist = await Patient.findById(id);
            if (exist) {
                await await Patient.findByIdAndUpdate(id, { $set: patient }, { new: true }).exec();
                return res.status(204).send();
            }
            return res.status(404).json({
                message: 'Paciente não localizado.'
            })

        } catch (e) {
            return errorService.sendErrors(req, res, e);
        }
    },

    async findAll(req, res) {
        const { cpf, name } = req.query;
        const userId = req.userId;
        var condition = name
            ? { name: { $regex: new RegExp(name), $options: "i" }, user: userId }
            : null;
        if (cpf) {
            const userId = req.userId
            const patient = await this.findOneByCpf(cpf, userId);
            if (patient) {
                return res.json(patient)
            }
            return res.status(404).send({
                message: 'Paciente não localizado.'
            });
        }
        if (condition) {
            const patients = await this.findAllByName(condition);
            if (patients) {
                return res.json(patients);
            }
            return res.status(404).send({
                message: 'Paciente não localizado.'
            })
        }

        return await this.findAllByUserId(req, res);
    },

    async findOneByCpf(cpf, userId) {
        return await Patient.findOne({
            cpf: cpf,
            userId: userId,
        })
    },

    async findAllByName(condition) {
        return await Patient.find(condition);
    },


    async findAllByUserId(req, res) {
        const { page, size } = req.query;
        const userId = req.userId;
        Patient.paginate({ user: userId }, { page, size, populate: optionPopulateImage })
            .then((data) => {
                res.send({
                    totalItems: data.totalDocs,
                    patients: data.docs,
                    totalPages: data.totalPages,
                    currentPage: page,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving patient.",
                });
            });
    }

}