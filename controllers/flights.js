const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show,
};

function newFlight(req, res) {
    res.render('flights/new', {title:'Add Flight'});
}

function show(req,res){
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', {title: 'Flight Detail', flight, tickets});
        })
    });
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
        res.redirect(`/flights/${flight._id}`);
    });
}