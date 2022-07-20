const mongoose = require('mongoose');

const personAddressSchema = new mongoose.Schema({
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    zip_code : { type: String, required : true},
    street : { type: String},
    number : { type: String},
    complement : { type: String},
    district : { type: String},
    city : { type: String},
    federative_unit : { type: String}
}, {
    timestamps: true
});

mongoose.model('Address', personAddressSchema);