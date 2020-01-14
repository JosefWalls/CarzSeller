import axios from "axios";


const initialState = {
    loading: false,
    make: "",
    model: "",
    makes: [],
    models: [],
    cars: [],
    car: [],
    owner: []
}

const FILTER_MAKES = "FILTER_MAKES";
const FILTER_MODELS = "FILTER_MODELS";
const GET_CARS = "GET_CARS";
const UPDATE_STATE = "UPDATE_STATE";
const SEARCH_CARS_MAKES = "SEARCH_CAR_MAKES";
const SEARCH_CARS_NO_MODEL = "SEARCH_CARS_NO_MODEL";
const GET_CAR = "GET_CAR";
const GET_OWNER = "GET_OWNER";

export const filterMakes = () => {
    return{
        type: FILTER_MAKES,
        payload: axios.get("/autoClone/Car/Sort/AllMakes")
    }
}

export const filterModels = (make) => {
    return {
        type: FILTER_MODELS,
        payload: axios.get(`autoClone/Car/Sort/Model/${make}`)
    }
}

export const getCars = (make, model) => {
    return {
        type: GET_CARS,
        payload: axios.get(`/autoClone/Car/Search/${make}/${model}`)
    }
}

export const getCarsOnlyMake = (make) => {
    return {
        type: SEARCH_CARS_NO_MODEL,
        payload: axios.get(`/autoClone/Car/Search/${make}`)
    }
}

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const carDetails = (carId) => {
    return {
        type: GET_CAR,
        payload: axios.get(`/autoClone/Car/ViewCar/${carId}`)
    }
}

export const getCarOwner = (posterId) => {
    return {
        type: GET_OWNER,
        payload: axios.get(`/autoClone/Car/ViewCar/Owner/${posterId}`)
    }
}

export default function reducer (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case `${FILTER_MAKES}_PENDING`:
            return {...state}
        case `${FILTER_MAKES}_FULFILLED`:
            return {...state, makes: payload.data}
        case `${FILTER_MODELS}_PENDING`:
            return {...state}
        case `${FILTER_MODELS}_FULFILLED`:
            return {...state, models: payload.data}
        case `${GET_CARS}_PENDING`:
            return {...state, loading: true}
        case `${GET_CARS}_FULFILLED`:
            return {...state, loading: false, cars: payload.data}
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${SEARCH_CARS_NO_MODEL}_PENDING`:
            return {...state, loading: true}
        case `${SEARCH_CARS_NO_MODEL}_FULFILLED`:
            return {...state, loading: false, cars: payload.data}
        case `${GET_CAR}_PENDING`:
            return {...state, loading: true}
        case `${GET_CAR}_FULFILLED`:
            return {...state, loading: false, car: payload.data}
        case `${GET_OWNER}_PENDING`:
            return {...state, loading: true}
        case `${GET_OWNER}_FULFILLED`:
            return {...state, loading: false, owner: payload.data}
        default:
            return state
    }
}