const mongoose = require("mongoose")

const vnSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    original: {
        type: String
    },
    aliases: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    popularity: {
        type: Number
    },
    rating: {
        type: Number
    },
    screens: [{
        id: Number,
        image: String
    }]
});

module.exports = mongoose.model("vn", vnSchema);