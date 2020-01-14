import axios from "axios";


const initalState = {
    loading: false,
    email: "",
    password: "",
    loggedIn: false,
    user: []
}

const UPDATE_STATE = "UPDATE_STATE";
const LOGGED_IN = "LOGGGED_IN";

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const logIn = (email, password) => {
    return {
        type: LOGGED_IN,
        payload: axios.post("/autoClone/account/signin", {
            email: email,
            password: password
        })
    }
}

export default function reducer (state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${LOGGED_IN}_PENDING`:
            return {...state, loading: true}
        case `${LOGGED_IN}_FULFILLED`:
            return {...state, loading: false, loggedIn: true, user: payload.data}
        default:
            return state
    }
}