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
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());
app.use(express.json());

//MongoDB connection
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
	.then((x) => {
		console.log('Connected to MongoDB!');
	})
	.catch((err) => {
		console.log('Error while connecting to MongoDB!');
	});

//Passport JWT
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_JWT;
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		try {
			User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
					// or you could create a new account
				}
			});
		} catch (error) {
			console.log(error);
		}
	}),
);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/podcast', podcastRoutes);
app.use('/playlist', playlistRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
