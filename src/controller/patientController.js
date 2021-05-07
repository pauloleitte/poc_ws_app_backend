const patientService = require("../service/patientService")
const errorService = require("../service/errorsService");

module.exports = {
    async create(req, res) {
        const patient = req.body;
        patient.userId = req.userId;
        try {
            const exist = await patientService.findOneByCpf(patient.cpf, patient.userId);
            if (!exist) {
                return res.status(201).json(
                    await patientService.create(patient)
                );
            }
            return res.status(400).json({
                message: 'Paciente já cadastrado.'
            });
        } catch (e) {
            return errorService.sendErrors(req, res, e);
        }
    },

    async delete(req, res) {
        const id = req.params.id
        try {
            const exist = await patientService.findById(id);
            if (exist) {
                await patientService.findByIdAndRemove(id);
                return res.status(204).send();
            }
            return res.status(404).json({
                message: 'Paciente não localizada.'
            })
        } catch (e) {
            return errorService.sendErrors(req, res, e);
        }
    },

    async update(req, res) {
        const patient = req.body;
        const id = req.params.id
        try {
            const exist = await patientService.findById(id)
            if (exist) {
                await patientService.findByIdAndUpdate(id, patient);
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
        const cpf = req.query.cpf
        if (cpf) {
            const userId = req.userId
            const patient = await patientService.findOneByCpf(cpf, userId);
            if (patient) {
                return res.json(patient)
            }
            return res.status(404).send({
                message: 'Paciente não localizado.'
            });
        }
        return res.json(await patientService.findAll(req.userId));
    },

    async findById(req, res) {
        const id = req.params.id
        const patient = await patientService.findById(id)
        if (patient) {
            return res.json(patient)
        } else {
            return res.status(404).send({
                message: 'Paciente não localizado.'
            });
        }
    }
}
