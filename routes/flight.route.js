const {Router} = require('express');
const {FlightModel} = require('../models/flight.model');

const flightRouter = Router();

// all available flights
flightRouter.get('/flights', async (req,res) => {
    try {
        const data = await FlightModel.find();
        if(data.length>0){
            res.status(200).json({data: data});
        } else {
            res.status(200).json({msg: "No flights"});
        }
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

//specific flight
flightRouter.get('/flights/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const data = await FlightModel.findOne({_id: id});
        if(data){
            res.status(200).json({data: data});
        } else {
            res.status(200).json({msg: "No specific flight"});
        }
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

//add new flights to the system.
flightRouter.post('/flights', async (req,res) => {
    try {
        const {airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price} = req.body;
        const payload = {airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price};
        const data = new FlightModel(payload);
        await data.save();
        res.status(201).json({data: data});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

//update the details of a specific flight identified by its ID.
flightRouter.put('/flights/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const payload = req.body;
        const data = await FlightModel.findByIdAndUpdate(id,payload);
        res.status(204).json({msg: "Data updated", data: data});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

//delete a specific flight identified by its ID..
flightRouter.delete('/flights/:id', async (req,res) => {
    try {
        const {id} = req.params;
        await FlightModel.findByIdAndDelete(id);
        res.status(202).json({msg: "Data deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

module.exports = flightRouter;