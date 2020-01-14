//for editing, adding and deleting cars
const axios  = require("axios");

const initialState = {
    loading: false,
    cars: [],
    year: 0,
    makes: ["Acura", "Alfa Romeo", "AMC", "Aston Martin", "Audi", "Bentley", "BMW", "Buggati", "Buick", "Cadillac", "Chevy", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", "Honda", "Hummer", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren", "Mercedes", "Mini", "Mitsubishi", "Nissan", "Porsche", "RAM", "Rolls-Royce", "Scion", "Smart", "SRT", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"],
    make: "",
    model: "",
    description: "",
    price: 0,
    miles: 0,
    highway: 0,
    city: 0,
    transmission: "",
    engine: "",
    header: "",
    vin: 0,
    stockNumber: 0,
    exterior: "",
    interior: "",
    car: [],
    views: 0
}

const UPDATE_STATE = "UPDATE_STATE";
const GET_PROFILE_CARS = "GET_PROFILE_CARS";
const ADD_CAR = "ADD_CAR";
const UPDATE_CAR = "UPDATE_CAR";
const UNLIST_CAR = "UNLIST_CAR";
const ADD_VIEW = "ADD_VIEW";

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const getProfileCars = (e) => {
    return {
        type: GET_PROFILE_CARS,
        payload: axios.get("/autoClone/Car/User/Cars")
    }
}

export const addcar = (year, make, model, description, price, miles, highway, city, transmission, engine, header, vin, stockNumber, exterior, interior) => {
    return {
        type: ADD_CAR,
        payload: axios.post(`/autoClone/Car/Add`, {
            year: year,
            make: make,
            model: model,
            description: description,
            price: price,
            miles: miles,
            highway: highway,
            city: city,
            transmission: transmission,
            engine: engine,
            header: header,
            vin: vin,
            stockNumber: stockNumber,
            exterior: exterior,
            interior: interior
        })
    }
}

export const updateCar = (carId, year, make, model, description, price, miles, highway, city, transmission, engine, header, vin, stockNumber, exterior, interior) => {
    return {
        type: UPDATE_CAR,
        payload: axios.put(`autoClone/Car/Edit/${carId}`, {
            year: year,
            make: make,
            model: model,
            description: description,
            price: price,
            miles: miles,
            highway: highway,
            city: city, 
            transmission: transmission,
            engine: engine,
            header: header,
            vin: vin,
            stockNumber: stockNumber, 
            exterior: exterior,
            interior: interior
        })
    }
}

export const unlistCar = (carId) => {
    return {
        type: UNLIST_CAR,
        payload: axios.delete(`/autoClone/Car/Delete/${carId}`)
    }
}

export const addView = (views, carId) => {
    return {
        type: ADD_VIEW,
        payload: axios.put(`autoClone/Car/AddView/${carId}`, {
            views: views
        })
    }
}

export default function reducer (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${GET_PROFILE_CARS}_PENDING`:
            return {...state, loading: true}
        case `${GET_PROFILE_CARS}_FULFILLED`:
            return {...state, loading: false, cars: payload.data}
        case `${ADD_CAR}_PENDING`:
            return {...state, loading: true}
        case `${ADD_CAR}_FULFILLED`:
            return {...state, loading: false}
        case `${UPDATE_CAR}_PENDING`:
            return {...state, loading: true}
        case `${UPDATE_CAR}_FULFILLED`:
            return {...state, loading: false}
        case `${UNLIST_CAR}_PENDING`:
            return {...state, loading: true}
        case `${UNLIST_CAR}_FULFILLED`:
            return {...state, loading: false}
        case `${ADD_VIEW}_PENDING`:
            return {...state, loading: true}
        case `${ADD_VIEW}_FULFILLED`:
            return {...state, loading: false}
        default:
            return state
    }
}