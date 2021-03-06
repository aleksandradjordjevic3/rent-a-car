const router = require('express').Router();
let Rental = require('../models/rental.model');

router.route('/').get((req, res) => {
    Rental.find()
        .then(rentals => res.json(rentals))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
        const startDateTime = Date.parse(req.body.startDateTime);
        const endDateTime = Date.parse(req.body.endDateTime);
        const vehicle = req.body.vehicle;
        const customer = req.body.customer;
        const totalPrice = Number(req.body.totalPrice);

        const newRental = new Rental({
            startDateTime,
            endDateTime,
            vehicle,
            customer,
            totalPrice
    });

    newRental.save()
        .then(() => res.json('New Rental Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = router;