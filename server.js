'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Patient = require('./model/patients');

// create our instances
var app = express();
var router = express.Router();

// set our port to either a predetermind port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;


//db config
var mongoDB = 'mongodb://kamrannazir:kamran@ds151433.mlab.com:51433/patientdata';
mongoose.connect(mongoDB, {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo db connection error'));

// now we should configure the API to use body parser and look for JSON data in the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// to prevent errors from cross origin resourse sharing, we will set our headers to allow CORS and middleware like so
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// now we can set the route path & initiliaze the API
router.get('/', function(req, res){
	res.json({message: 'API initiliazed'});
});

//adding the /patients route to our /api router
router.route('/patients')
	//retrieve all patients from the database
	.get(function(req, res){
		//look at our patient Schema
		Patient.find(function(err, patients){
			if (err) {res.send(err)}
				// respond with a json object of our database patients.
				res.json(patients)
		})
	})
	//post new patient to the database
	.post(function(req, res){
		var patient = new Patient();
		//body parser lets us use the req.body
		patient.name = req.body.name;
		patient.disease = req.body.disease;
		patient.date = req.body.date;

		patient.save(function(err){
			if (err) {res.send(err)}
				res.json({message: 'Patient successfully added'})
		})
	})

// use our router configuration when we call /api
app.use('/api', router);

// starts the server and listens for requests
app.listen(port,function(){
	console.log('api running on port ${port}');
});

