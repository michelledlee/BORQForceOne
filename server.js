const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const PORT = process.env.PORT || 3001;

const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");

let path = require('path');

let db;


app.use(express.static(path.join(__dirname, 'client', 'build')));

// session stuff 
app.use(session({ 
	secret: "Shh, its a secret!",
	resave: true,
    saveUninitialized: true }));

// extract data from <form> and add to body property in request
app.use(bodyParser.urlencoded({extended: true}));

// for parsing application/json
app.use(bodyParser.json()); // for parsing application/json

// mongo connection
MongoClient.connect('mongodb+srv://michelledlee:wVewSigYCrfARa0N@borq-s5a7m.mongodb.net/borq?retryWrites=true', (err, client) => {
	if (err) return console.log(err)

		db = client.db('borq');

	// start server only when database is connected
	app.listen(PORT, () => {
		console.log('listening on ' + PORT)
	});
});


// handles registration post request
app.post('/users', (req, res) => {
	// validate input
	const { errors, isValid } = validateRegisterInput(req.body);
	console.log(errors);
	console.log(isValid);

	// if the input is not valid, return errors
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// see if the user has already been added
	db.collection('users').findOne({email: req.body.email}).then(user => {
		// case if the user exists; leave
		if (user) {
			return res.status(400).json({email: "Email already exists"});
		}
	})

	// store the user in the database
	console.log(req.body);
	let newUser = req.body;
	    // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          	db.collection('users').save(newUser, (err, result) => {
		if (err) return console.log(err);

			console.log('saved to database');
		res.redirect('/');
	});
        });
      });

});

// handles dogs post request
app.post('/dogs', (req, res) => {
	console.log(req.body);
	db.collection('dogs').save(req.body, (err, result) => {
		if (err) return console.log(err);

			console.log('saved to database');
		res.redirect('/');
		// res.send("nice dog");
	});
});

// check if logged in
app.get('/loggedIn', (req, res) => {
	if(req.session.user) {
		res.send(req.session.user);
	}
	else {
		res.send({nope:"no log for you"});
	}
})

// get users list of dogs
app.get('/getmydogs', (req, res) => {
	if(req.session.user) {
		db.collection('dogs').find({myemail : req.session.user.email})
		.toArray(function (err, docs) {
		res.send(JSON.stringify(docs));
		});
	} else {
		res.send({nope:"no dogs for you"});
	}
})

// get users events
app.get('/getmyevents', (req, res) => {
	if(req.session.user) {
		console.log(req.session.user.email)
		db.collection('events').find({rsvp: { $in: [req.session.user.email]}})
		.toArray(function (err, docs) {
		res.send(JSON.stringify(docs));
		});
	} else {
		res.send({nope:"no events for you"});
	}
})

// get all events
app.get('/getallevents', (req, res) => {
	db.collection('events').find({})
	.toArray(function (err, docs) {
		res.send(JSON.stringify(docs));
	})
});

// handles events post request
app.post('/events', (req, res) => {
	console.log(req.body);
	console.log("User" + req.session.user);
	db.collection('events').save(req.body, (err, result) => {
		if (err) return console.log(err);

			console.log('saved to database');
		res.redirect('/');
		// res.send("event sent");
	});
});

// login
app.post('/login', (req, res) => {

	// run login information through validator
	const { errors, isValid} = validateLoginInput(req.body);

	// check validation
	if (!isValid) {
		console.log(errors);
		return res.status(400).json(errors);
	}

	// information is valid, proceed to login
	console.log("server");
	console.log(req.body);
	const email = req.body.email;
  const password = req.body.password;
	db.collection('users').findOne({email : email}).then(user => {
		// Check if user exists
   		 if (!user) {
      	return res.status(404).json({ emailnotfound: "Email not found" });
 	   }

		let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
		console.log(req.body.password);
		console.log(user.password);
		console.log(isPasswordValid);
		if (!isPasswordValid) {
			console.log("Password is wrong fool");
			res.send({error:"true"});
		} else {
			console.log("You're logged in now baby");
			req.session.user = user;
			res.send({email: user.email});
		}
	});
});

// handles RSVP request
app.post('/rsvp', (req, res) => {
	console.log(req.body);
	const eventName = req.body.name;
	console.log(req.session.user);
	db.collection('events').findOneAndUpdate({name: eventName}, {$addToSet:{rsvp : req.session.user.email}}).then(user => {
		res.send("completed");
		// res.redirect('/');
	});

});

// handles logout request
app.post('/logout', (req, res) => {
	req.session.destroy();
	res.send("session ded");
});
