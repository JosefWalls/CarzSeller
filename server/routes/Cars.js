const cars = require("../models/Cars");
const Router = require("express").Router();
const User = require("../models/User");

Router.route("/Add").post((req, res) => {
    console.log("added hit")
    const {year, make, model, description, images, price, miles, highway, city, transmission, engine, condition, header, vin, stockNumber, exterior, interior} = req.body;
    const userId = req.session.user.userId;
    const newCar = new cars();
    newCar.year = year;
    newCar.make = make;
    newCar.model = model;
    newCar.description = description;
    newCar.images = images;
    newCar.posterId = userId;
    newCar.price = price;
    newCar.miles = miles;
    newCar.highway = highway;
    newCar.city = city;
    newCar.transmission = transmission;
    newCar.engine = engine;
    newCar.condition = condition;
    newCar.header = header;
    newCar.vin = vin;
    newCar.stockNumber = stockNumber;
    newCar.exterior = exterior;
    newCar.interior = interior;
    newCar.save((err, car) => {
        if(err){
            res.status(403).json(err)
        } else {
            res.status(200).json(car)
        }

        res.end("Car added")
    })
    });

    Router.route("/Sort/AllMakes").get((req, res) => {
        cars.distinct("make")
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
    })

    Router.route("/Sort/Model/:make").get((req, res) => {
        const make = req.params.make;
        cars.distinct("model", {make})
        .then(cars => res.json(cars))
        .catch(error => res.json(error))
    })

    //if user doesnt enter any params
    Router.route("/Search").get((req, res) => {
        cars.find()
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
    })

    //if user only enters make
    Router.route("/Search/:make").get((req, res) => {
        const make = req.params.make;
        console.log(make)
        cars.find({make})
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
    })

    //searches make and model
    Router.route("/Search/:make/:model").get((req, res) => {
        const make = req.params.make;
        const model = req.params.model;
        cars.find({make, model})
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
    })

    Router.route("/ViewCar/:car_id").get((req, res) => {
        console.log("hit added")
        const carId = req.params.car_id;
        cars.find({_id: carId})
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
    })


    Router.route("/User/Cars").get((req, res) => {
        const posterId = req.session.user.userId;
        cars.find({posterId})
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
    })

    Router.route("/ViewCar/Owner/:posterId").get((req, res) => {
        const userId = req.params.posterId;
        User.find({_id: userId})
        .then((profile => res.json(profile)))
        .catch(err => res.json(err))
    })

    Router.route("/Edit/:carId").put((req, res) => {
        const carId = req.params.carId
        const {year, make, model, description, price, miles, highway, city, transmission, engine, header, vin, stockNumber, exterior, interior} = req.body;
        cars.updateOne({_id: carId},  {$set: {year: year, make: make, model: model, description: description, price: price, miles: miles, highway: highway, city: city, transmission: transmission, engine: engine, header: header, vin: vin, stockNumber: stockNumber, exterior: exterior, interior: interior}})
        .then(() => res.json("Car updated"))
        .catch(err => res.json(err))
    })

    Router.route("/Delete/:carId").delete((req, res) => {
        const carId = req.params.carId;
        cars.deleteOne({_id: carId})
        .then(() => {
            res.json("Car deleted")
        })
        .catch(err => {
            res.json(err)
        })
    })

    Router.route("/AddView/:carId").put((req, res)=> {
        const carId = req.params.carId;
        const {views} = req.body;
        cars.updateOne({_id: carId}, {$set: {views: views}})
        .then(() => res.json("Views added"))
        .catch(err => res.json(err))
    })



module.exports = Router;