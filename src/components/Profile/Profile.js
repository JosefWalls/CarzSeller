import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getProfileCars} from "../../quakers/reducers/UserCarReducer";
import "./Profile.css";

class Profile extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getProfileCars()
    }

    render() {
        const mappedCars = this.props.cars.map((val, i) => {
            return (
                <div className="ProfileCarCard">
                    <h3>{val.year} {val.make} {val.model}</h3>
                    <img src={val.header}></img>
                    <Link to={`/Profile/ManageCar/${val._id}`}>
                        <button>Manage Vehicle</button>
                    </Link>
                </div>
            )
        })
        return (
            <section className="profileSection">
                <div className="profileCard">
                 {mappedCars}
                <Link to="/Profile/AddCar">
                    <button className="submitButton">Add Car</button>
                </Link>
                </div>
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        cars: reduxState.UserCarReducer.cars
    }
}

export default connect(mapStateToProps, {getProfileCars})(Profile);