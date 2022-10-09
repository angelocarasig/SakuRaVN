const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: "The ID of the user is required."
    },
    username: {
        type: String,
        required: "the username of the user is required."
    },
    vnlist: [{
        vn: Number,
        vote: Number,
        notes: String,
        started: Date,
        finished: Date,
        added: Date,
        lastmod: Date,
        voted: Date,

    }],
});

module.exports = mongoose.model("User", userSchema);