var express           = require('express'),
    app	              = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    meetupsController = require('./server/controllers/meetups-controller');

mongoose.connect('mongodb://localhost:27017/mean-demo');

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendfile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));

//REST API
app.get('/RESTapi/meetups', meetupsController.list);
app.get('/RESTapi/meetups/:id', meetupsController.meetup);
app.post('/RESTapi/meetups', meetupsController.create);
app.delete('/RESTapi/meetups/:id', meetupsController.deleteMeetup);
app.put('/RESTapi/meetups/:id', meetupsController.updateMeetup);

app.listen(3000, function() {
    console.log('I\'m Listening...');
});