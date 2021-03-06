const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection established successfully");
});

const vehiclesRouter = require('./routes/vehicles');
const customersRouter = require('./routes/customers');
const rentalsRouter = require('./routes/rentals');

app.use('/vehicles', vehiclesRouter);
app.use('/customers', customersRouter);
app.use('/rentals', rentalsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});