/** @format */

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const podcastRoutes = require('./routes/podcast');
const playlistRoutes = require('./routes/playlist');
const cors = require('cors');
const PORT = 8000;
const app = express();

// // Define the CORS options
// const corsOptions = {
// 	origin: '*', // Allow this origin
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
// 	allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
// 	credentials: true, // Enable if you need to send cookies or authentication headers
// };

// // Use the CORS middleware for general CORS handling
// app.use(cors(corsOptions));

app.use(cors());
// Utility to wrap handlers for CORS
const allowCors = (fn) => async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,OPTIONS,PATCH,DELETE,POST,PUT',
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}
	return await fn(req, res);
};

app.use(express.json());

// MongoDB connection
mongoose
	.connect(
		'mongodb+srv://admin:' +
			process.env.MONGO_PASSWORD +
			'@cluster0.x61ewkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	)
	.then(() => {
		console.log('Connected to MongoDB!');
	})
	.catch((err) => {
		console.log('Error while connecting to MongoDB!', err);
	});

// Passport JWT
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_JWT;
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}),
);

// Wrap routes with allowCors

app.get(
	'/',
	allowCors((req, res) => {
		res.send('Hello World! This is my server');
	}),
);

app.use('/auth', (req, res, next) => allowCors(authRoutes)(req, res, next));
app.use('/podcast', (req, res, next) =>
	allowCors(podcastRoutes)(req, res, next),
);
app.use('/playlist', (req, res, next) =>
	allowCors(playlistRoutes)(req, res, next),
);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
