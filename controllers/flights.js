const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
};

function newFlight(req, res) {
    res.render('flights/new');
}

function index(req,res) {
    Flight.find({}, function (err, flights) {
        res.render('flights/index', {flights});
    });
}

function create(req,res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function (err) {
        //handling errors
        if (err) return res.render('flights/new');
        console.log(flight);
        //and then redirect
        res.redirect('/flights');
    });
}