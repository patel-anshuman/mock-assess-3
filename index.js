const express = require('express');
const cors = require('cors');

//Imported DB connection
const {connection} = require('./database/db');

//Imported middlewares
const {auth} = require('./middlewares/auth.middleware');

//Imported routes
const userRoute = require('./routes/user.route');
const flightRoute = require('./routes/flight.route');
const bookingRoute = require('./routes/booking.route');

require('dotenv').config();

const app = express();  //Created Express App

app.use(express.json());
app.use(cors());

app.get('/', async (req,res) => {
    res.status(200).json({msg: "Air Ticket Booking"});
});

app.use('/api',userRoute);
app.use(auth);
app.use('/api',flightRoute);
app.use('/api',bookingRoute);

//Establishing Atlas DB connection
const port = process.env.PORT;
app.listen(port, async() => {
    try {
        await connection;
        console.log("Connected to Mongo Atlas DB");
        console.log(`Server running at port ${port}`);
    } catch (error) {
        console.log("Error connecting to database");
    }
})

module.exports = app;   //Exported Express App