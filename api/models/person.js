const mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    last_name: { type: String },
    phone: { type: String },
    email: { type: String },
    status: { type: Boolean }
},
    {
        timestamps: true
    });

mongoose.model('Person', personSchema);