const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
};

function newTicket(req, res) {
    res.render('tickets/new', {title:'Add Ticket', flightId:req.params.id});
}

function create(req,res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const ticket = new Ticket(req.body);
    ticket.flight = req.params.id;
    ticket.save(function (err) {
        if (err) return res.render('tickets/new');
        res.redirect(`/flights/${ticket.flight}`);
    })
}