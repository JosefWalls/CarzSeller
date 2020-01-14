import React from "react";
import {connect} from "react-redux";
import {getCars, getCarsOnlyMake} from "../../quakers/reducers/CarReducer";
import "./ViewCars.css";
import {Link} from "react-router-dom";

class ViewCar extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        const make = this.props.make;
        const model = this.props.model;
        if(model.length === 0){
            this.props.getCarsOnlyMake(make)
        } else {
            this.props.getCars(make, model)
        }

    }


    render() {
        const mappedCars = this.props.cars.map((val, i) => {
            return (
                <Link to={`/Search/${val._id}`}>
                    <div className="carSearchCard">
                        <img src={val.header} alt="Car image"></img>
                    <div className="carInfo">
                        <h1>{val.year} {val.make} {val.model}</h1>
                        <p>Miles: {val.miles} || {val.highway} highway / {val.city} city || Transmission: {val.transmission}</p>
                        <h3>${val.price}</h3>
                    </div>
                    </div>
                </Link>
            )
        })
        return (
            <div className="mappedCars">
                {mappedCars}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        cars: reduxState.CarReducer.cars,
        make: reduxState.CarReducer.make,
        model: reduxState.CarReducer.model
    }
}

export default connect(mapStateToProps, {getCars, getCarsOnlyMake})(ViewCar);