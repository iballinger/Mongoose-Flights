const Flight = require('../models/flight');

module.exports = {
    create,
    delete : deleteDestination,
};

function create(req,res) {
    Flight.findById(req.params.id, function(err, flight) {

        
        flight.destinations.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${req.params.id}`);
        });
    });
}

function deleteDestination(req,res,next){
    Flight.findOne({'destinations._id': req.params.id, 'destinations.user':req.user._id}).then(function(flight) {
        if (!flight) return res.redirect('/flights');
        flight.destinations.remove(req.params.id);
        flight.save().then(function() {
            res.redirect(`/flights/${flight._id}`);
        }).catch(function(err) {
            return next(err);
        });
    });
}