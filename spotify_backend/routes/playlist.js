/** @format */

const express = require('express');
const mongoose = require('mongoose');
const Podcast = require('../models/Podcast');
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

//Add a new playlist
router.post(
	'/create',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { name, thumbnail, songs } = req.body;
		if (!name || !thumbnail || !songs) {
			return res
				.status(400)
				.json({ error: 'Fill in all the details to add a podcast!' });
		}
		const artist = req.user._id;
		const playlistDetails = {
			name,
			thumbnail,
			songs,
			owner: artist,
			collaborators: [],
		};
		const createdPlaylist = await Playlist.create(playlistDetails);
		return res.json(createdPlaylist);
	},
);

//Get all playlists published by a particular ID
router.get(
	'/get/playlist/:playlistId',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const playlistId = req.params.playlistId;
			const playlist = await Playlist.findOne({ _name: playlistId });
			if (!playlist) {
				return res.status(301).json({ err: 'Invalid ID!' });
			}
			return res.json({ data: playlist });
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error' }); // Handle internal server error
		}
	},
);

//Get all playlists published by me
router.get(
	'/get/me',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const artistId = req.user._id;
			const playlists = await Playlist.find({ owner: artistId }).populate(
				'owner',
			);
			return res.json({ data: playlists });
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error' }); // Handle internal server error
		}
	},
);

//Get all playlists published by a particular artist
router.get(
	'/get/artist/:artistId',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const artistId = req.params.artistId;
			const playlists = await Playlist.find({ owner: artistId });
			return res.json({ data: playlists });
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error' }); // Handle internal server error
		}
	},
);

//Add a podcast to a playlist
router.post(
	'/add/song',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const currentUser = req.user;
			const { playlistId, podcastId } = req.body;
			const playlist = await Playlist.findOne({ _id: playlistId });
			if (!playlist) {
				return res.status(304).json({ err: 'Playlist doesnt exist' });
			}
			if (
				!playlist.owner.equals(currentUser._id) &&
				!playlist.collaborators.includes(currentUser._id)
			) {
				return res.status(400).json({ err: 'Not allowed' });
			}
			const podcast = await Podcast.findOne({ _id: podcastId });
			if (!podcast) {
				return res.status(304).json({ err: 'Podcast doesnt exist' });
			}
			playlist.podcasts.push(podcastId);
			await playlist.save();
			return res.json(playlist);
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error' }); // Handle internal server error
		}
	},
);

module.exports = router;
