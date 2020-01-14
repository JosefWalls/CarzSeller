const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    year: {
        type: Number,
        default: 2020
    }, 
    make: {
        type: String,
        default: ""
    },
    model: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    posterId: {
        type: String,
        default: 0
    },
    price: {
        type: String,
        default: 0
    },
    miles: {
        type: String,
        default: 0
    }, 
    highway: {
        type: String,
        default: 0
    },
    city: {
        type: String,
        default: 0
    },
    transmission: {
        type: String,
        default: "Automatic"
    },
    engine : {
        type: String,
        default: ""
    },
    header: {
        type: String,
        default: ""
    },
    views: {
        type: Number,
        default: 0
    },
    vin: {
        type: Number,
        default: 0
    },
    stockNumber: {
        type: Number,
        default: 0
    },
    exterior: {
        type: String,
        default: ""
    },
    interior: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Car", CarSchema);