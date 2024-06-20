const mongoose = require('mongoose');

const Podcast = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    track:{
        type: String,
        required: true,
    },
    artist:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const PodcastModel = mongoose.model("Podcast", Podcast);

module.exports = PodcastModel;