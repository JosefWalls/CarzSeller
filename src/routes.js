import React from "react";
import {Route, Switch} from "react-router-dom";


import Login from  "./components/Auth/Login";
import Landing from "./components/LandingSearch/Landing";
import ViewCars from "./components/Search/ViewCars";
import Profile from "./components/Profile/Profile";
import AddCar from "./components/Profile/AddCar";
import ViewCar from "./components/Search/ViewCar";
import ManageCar from "./components/Profile/ManageCar";

export default (
    <Switch>
        <Route component={AddCar}  path="/Profile/AddCar" />
        <Route component={Login} path="/Login" />
        <Route component={Landing} exact path="/" />
        <Route component={ViewCar} path="/Search/:car_id" />
        <Route component={ViewCars} path="/Search" />
        <Route component={Profile} exact path="/Profile/:userId" />
        <Route component={ManageCar} path="/Profile/ManageCar/:carId"/>
    </Switch>
)