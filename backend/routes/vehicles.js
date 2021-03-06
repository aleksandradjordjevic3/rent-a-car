const router = require('express').Router();
let Vehicle = require('../models/vehicle.model');

router.route('/').get((req, res) => {
    Vehicle.find()
        .then(vehicles => res.json(vehicles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
     const type = req.body.type;
    const brand = req.body.brand;
    const carModel = req.body.carModel;
    const year = req.body.year;
    const fuelType = req.body.fuelType;
    const numOfSeats = req.body.numOfSeats;
    const image = req.body.image;
    const pricePerDay = Number(req.body.pricePerDay);
    const numOfAvailable = Number(req.body.numOfAvailable);
    const numOfRented = Number(req.body.numOfRented);

    const newVehicle = new Vehicle({
        type,
        brand,
        carModel,
        year,
        fuelType,
        numOfSeats,
        image,
        pricePerDay,
        numOfAvailable,
        numOfRented
    });

    newVehicle.save()
        .then(() => res.json('Vehicle added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Vehicle.findByIdAndDelete(req.params.id)
        .then(() => res.json('Vehicle deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => {
            vehicle.type = req.body.type;
            vehicle.brand = req.body.brand;
            vehicle.carModel = req.body.carModel;
            vehicle.year = req.body.year;
            vehicle.fuelType = req.body.fuelType;
            vehicle.numOfSeats = req.body.numOfSeats;
            vehicle.image = req.body.image;
            vehicle.pricePerDay = Number(req.body.pricePerDay);
            vehicle.numOfAvailable = Number(req.body.numOfAvailable);
            vehicle.numOfRented = Number(req.body.numOfRented);

            vehicle.save()
                .then(() => res.json('Vehicle updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;