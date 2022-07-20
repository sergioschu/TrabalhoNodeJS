const mongoose = require('mongoose');
const ReturnMessage = require('../classes/return-message');
const PersonModel = mongoose.model('Person');
module.exports = {
    getAllPersons: async (req, res, next) => {
        try {
            const persons = await PersonModel.find();
            res.status(200).json({
                count: persons.length,
                persons: persons
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getByIDPerson: async (req, res, next) => {
        const id = req.params.id;
        try {
            const person = await PersonModel.findOne({ _id: id })
            if (person) {
                res.status(200).json(person)
            } else {
                res.status(404).json(new ReturnMessage("Pessoa não existe!"));
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    createPerson: async (req, res, next) => {
        try {

            if (!req.body.name) {
                return res.status(400).json(new ReturnMessage("Nome não informado!"));
            }

            let person = new PersonModel({});
            person.name = req.body.name;
            person.last_name = req.body.last_name;
            person.phone = req.body.phone;
            person.email = req.body.email;
            person.status = req.body.status;

            person = await person.save();
            res.status(201).json({
                message: 'Person created successfully',
                person: person
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deletePerson: async (req, res, next) => {
        const id = req.params.id;
        try {
            let status = await PersonModel.deleteOne({ _id: id });

            if (status.deletedCount > 0) {
                res.status(200).json(new ReturnMessage("Pessoa deletada com sucesso!"))
            } else {
                res.status(404).json(new ReturnMessage("Pessoa não localizada!"))
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}