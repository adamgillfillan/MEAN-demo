var Meetup = require('../models/meetup')

module.exports.create = function (req, res) {
    var meetup = new Meetup(req.body);
    meetup.save(function (err, result) {
        res.json(result);
    });
};

module.exports.list = function (req, res) {
    Meetup.find({}, function (err, results){
        res.json(results);
    });
};

module.exports.deleteMeetup = function (req, res) {
    Meetup.remove({ _id: req.params.id }, function (err) {
        res.json(true);
    });
};

module.exports.meetup = function(req, res) {
    console.log(req.params.id);
    Meetup.findOne({ _id: req.params.id }, function(err, obj) {
        res.json(obj);
    });
};

module.exports.updateMeetup = function (req, res) {
    Meetup.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name }
    }, { upsert: true },
    function(err, obj) {
        return res.json(obj);
    });
};