const cars = require("../models/Cars");
const Router = require("express").Router();
const User = require("../models/User");


Router.route("/SaveCar/:carId").post((req, res) => {
    const userId = (req.session.user.userId);
    const carId = req.params.carId;
    User.update({"_id": userId}, {$push: {"savedCars": carId}})
    .then(savedCars => {
        res.json(savedCars)
    })
    .catch(err => {
        res.json(err)
    })
})


module.exports = Router;