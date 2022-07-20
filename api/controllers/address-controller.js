const mongoose = require('mongoose');
const ReturnMessage = require('../classes/return-message');
const AddressModel = mongoose.model('Address');
const PersonModel = mongoose.model('Person');
module.exports = {
    getAllAddress: async (req, res, next) => {
        try {
            const address = await AddressModel.find();
            res.status(200).json({
                count: address.length,
                address: address
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getByIDAddress: async (req, res, next) => {
        const id = req.params.id;
        try {
            const address = await AddressModel.findOne({ _id: id })
            if (address) {
                res.status(200).json(address)
            } else {
                res.status(404).json(new ReturnMessage("Endereço não existe!"));
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    createAddress: async (req, res, next) => {
        try {

            const personID = req.body.person_id;

            const person = await PersonModel.findOne({ _id: personID });
            if (!person) {
                res.status(404).json({ message: "Pessoa não existe" });
                return;
            }

            let address = new AddressModel({});
            address.person_id = req.body.person_id;
            address.zip_code = req.body.zip_code;
            address.street = req.body.street;
            address.number = req.body.number;
            address.complement = req.body.complement;
            address.district = req.body.district;
            address.city = req.body.city;
            address.federative_unit = req.body.federative_unit;

            address = await address.save();
            res.status(201).json({
                message: 'Endereço criado com sucesso!',
                address: address
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteAddress: async (req, res, next) => {
        const id = req.params.id;
        try {
            let status = await AddressModel.deleteOne({ _id: id });

            if (status.deletedCount > 0) {
                res.status(200).json(new ReturnMessage("Endereço deletado com sucesso!"))
            } else {
                res.status(404).json(new ReturnMessage("Endereço não localizado!"))
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}