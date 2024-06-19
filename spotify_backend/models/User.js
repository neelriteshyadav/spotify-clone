const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true,
        private: true,
    },
    username:{
        type: String,
        required: true,
    },
    likedPodcasts:{
        type: String,
        default:"",
    },
    likedPlaylists:{
        type: String,
        default:"",
    },
    subscribedArtists:{
        type: String,
        default:"",
    },
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;