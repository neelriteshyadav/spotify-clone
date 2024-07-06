/** @format */

const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	thumbnail: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	podcasts: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'podcast',
		},
	],
	collaborators: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'user',
		},
	],
});

const PlaylistModel = mongoose.model('Playlist', Playlist);

module.exports = PlaylistModel;
