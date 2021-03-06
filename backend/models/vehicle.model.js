const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema( {
    type: {type: String, required: true},
    brand: {type: String, required: true},
    carModel: {type: String, required: true},
    year: {type: String, required: true},
    fuelType: {type: String, required: true},
    numOfSeats: {type: String, required: true},
    image: {type: String, required: true},
    pricePerDay: {type: Number, required: true},
    numOfAvailable: {type: Number, required: true},
    numOfRented: {type: Number, required: false}
    }, 
    {timestamps: true}
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;