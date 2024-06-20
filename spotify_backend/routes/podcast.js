const express = require('express');
const mongoose = require('mongoose');
const Podcast = require('../models/Podcast');
const passport = require('passport');
const router = express.Router();

//Add a new podcast
router.post("/create", passport.authenticate("jwt",{session: false}), async (req, res) => {
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track){
        return res.status(400).json({error: "Fill in all the details to add a podcast!"});
    }
    const artist = req.user._id;
    const podcastDetails = {name, thumbnail, track, artist};
    const createdPodcast = await Podcast.create(podcastDetails);
    return res.json(createdPodcast);
});

//Get all podcasts published by me
router.get("/get/mypodcasts", passport.authenticate("jwt",{session: false}), async (req, res) => {
    try {
        const podcasts = await Podcast.find({ artist: req.user._id }).populate("artist");
        return res.json({ data: podcasts });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" }); // Handle internal server error
    }
});

//Get all podcasts published by a particular artist
router.get("/get/artist/:artistId", passport.authenticate("jwt",{session: false}), async (req, res) => {
    try {
        const {artistId} = req.params;
        const podcasts = await Podcast.find({ artist: artistId });
        return res.json({ data: podcasts });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" }); // Handle internal server error
    }
});

//Get a podcast by podcast name
router.get("/get/podcastname/:podcastName", passport.authenticate("jwt",{session: false}), async (req, res) => {
    try {
        const {podcastName} = req.params;
        const podcasts = await Podcast.find({ name: { $regex: new RegExp(podcastName, 'i') } });
        return res.json({ data: podcasts });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" }); // Handle internal server error
    }
});

module.exports = router;