const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    startDateTime: {type: Date, required: true},
    endDateTime: {type: Date, required: true},
    vehicle: {type: String, required: true},
    customer: {type: String, required: true},
    totalPrice: {type: Number, required: true}
    },
    {timestamps: true}
);

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;