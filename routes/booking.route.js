const {Router} = require('express');
const {BookingModel} = require('../models/booking.model');

const bookingRouter = Router();

//allow the user to book flights
bookingRouter.post('/booking', async (req,res) => {
    try {
        const payload = { user: req.user._id, flight: req.body.flight};
        const data = new BookingModel(payload);
        await data.save();
        res.status(201).json({data: data});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

//list all the bookings so far with the user and flight details. #Populate user & flight data
bookingRouter.get('/dashboard', async (req,res) => {
    try {
        const data = await BookingModel.find().populate('user','flight').exec();
        if(data.length>0){
            res.status(200).json({data: data});
        } else {
            res.status(200).json({msg: "No bookings"});
        }
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

//allow the user to edit / update a booking.
bookingRouter.put('/dashboard/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const payload = { user: req.user._id, flight: req.body.flight};
        const data = await BookingModel.findByIdAndUpdate(id,payload);
        res.status(204).json({msg: "Booking updated", data: data});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

// allow the user to delete a booking
bookingRouter.delete('/dashboard/:id', async (req,res) => {
    try {
        const {id} = req.params;
        await BookingModel.findByIdAndDelete(id);
        res.status(202).json({msg: "Booking deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

module.exports = bookingRouter;