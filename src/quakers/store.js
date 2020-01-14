import {combineReducers, createStore, applyMiddleware} from "redux";
import promise from "redux-promise-middleware"

import AuthReducer from "./reducers/AuthReducer";
import CarReducer from "./reducers/CarReducer";
import UserCarReducer from "./reducers/UserCarReducer";

const root = combineReducers({
        AuthReducer,
        CarReducer,
        UserCarReducer
})


export default createStore(root, applyMiddleware(promise))