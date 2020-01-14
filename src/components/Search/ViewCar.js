import React from "react";
import {carDetails, getCarOwner} from "../../quakers/reducers/CarReducer";
import {updateState, addView} from "../../quakers/reducers/UserCarReducer";
import {connect} from "react-redux";
import "./ViewCar.css"

class ViewCar extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        await this.props.carDetails(this.props.match.params.car_id)
        const posterId = this.props.car[0].posterId;
        this.props.getCarOwner(posterId)
        const originalViews = +this.props.car[0].views++
        this.props.updateState({views: originalViews})
        console.log(originalViews)
        this.props.addView(this.props.views, this.props.match.params.car_id)
    }


    render() {
        const mappedCarHeader = this.props.car.map((val, i) => {
            return (
                <div className="carHeader">
                    <h1>{val.condition} {val.year} {val.make} {val.model}</h1>
                    <img src={val.header}></img>
                </div>
            )
        })
        const mappedCarDetails = this.props.car.map((val, i) => {
            return (
                <div className="carInformation">
                  <p>Mileage: {val.miles} miles</p>
                  <p>Highway: {val.highway}</p>
                  <p>City: {val.city}</p>
                  <p>Transmission: {val.transmission}</p>
                  <p>Engine: {val.engine}</p>
                </div>
            )
        })
        const mappedPrice = this.props.car.map((val, i) => {
            return (
                <div className="carPriceCard">
                    <h3>${val.price}</h3>
                </div>
            )
        })
        const mappedOwner = this.props.owner.map((val, i) => {
            return (
                <div className="mappedOwner">
                    <h1>{val.email}</h1>
                    <img src={val.profileImg}></img>
                    <p>Address: </p>
                </div>
            )
        })
        const mappedDescription = this.props.car.map((val, i) => {
            return (
                <div className="carDescription">
                    <p>{val.description}</p>
                </div>
            )
        })
        return (
            <div className="carDetails">
                {mappedCarHeader}
                {mappedPrice}
                {mappedCarDetails}
                {mappedOwner}
                {mappedDescription}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        car: reduxState.CarReducer.car,
        owner: reduxState.CarReducer.owner,
        views: reduxState.UserCarReducer.views
    }
}

export default connect(mapStateToProps, {carDetails, getCarOwner, updateState, addView})(ViewCar);