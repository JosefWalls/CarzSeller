import React from "react";
import {carDetails, updateState} from "./../../quakers/reducers/CarReducer";
import {updateCar, unlistCar} from "../../quakers/reducers/UserCarReducer";
import {connect} from "react-redux";
import "./ManageCar.css";

class ManageCar extends React.Component {
    constructor(){
        super()

        this.state = {
            editMenuHeader: "editMenuClosed",
            editMenuPrice: "editPriceClosed",
            editMenuDetails: "editDetailsClosed",
            editMenuDescription: "editDescriptionClosed"
        }
    }

    componentDidMount = async () => {
        await this.props.carDetails(this.props.match.params.carId);
        this.props.updateState({year: this.props.car[0].year});
        this.props.updateState({make: this.props.car[0].make});
        this.props.updateState({model: this.props.car[0].model});
        this.props.updateState({price: this.props.car[0].price})
        this.props.updateState({highway: this.props.car[0].highway})
        this.props.updateState({city: this.props.car[0].city})
        this.props.updateState({stockNumber: this.props.car[0].stockNumber})
        this.props.updateState({transmission: this.props.car[0].transmission})
        this.props.updateState({vin: this.props.car[0].vin})
        this.props.updateState({exterior: this.props.car[0].exterior})
        this.props.updateState({interior: this.props.car[0].interior})
    }

    changeHeaderMenu = (e) => {
        if(this.state.editMenuHeader === "editMenuClosed"){
            this.setState({editMenuHeader: "editMenuOpen"})
        } else {
            this.setState({editMenuHeader: "editMenuClosed"})
        }
    }

    changePriceMenu = (e) => {
        if(this.state.editMenuPrice === "editPriceClosed"){
            this.setState({editMenuPrice: "editPriceOpen"})
        } else {
            this.setState({editMenuPrice: "editPriceClosed"})
        }
    }

    changeDetailMenu = (e) => {
        if(this.state.editMenuDetails === "editDetailsClosed"){
            this.setState({editMenuDetails: "editDetailsOpen"})
        } else {
            this.setState({editMenuDetails: "editDetailsClosed"})
        }
    }

    changeDescriptionMenu = (e) => {
        if(this.state.editMenuDescription ==="editDescriptionClosed"){
            this.setState({editMenuDescription: "editDescriptionOpen"})
        } else {
            this.setState({editMenuDescription: "editDescriptionClosed"})
        }
    }

    handleUpdate = async (e) => {
        await this.props.updateState({[e.target.name]: e.target.value})
    }

    updateCar = async (e) => {
        const carId = this.props.match.params.carId;
        const {year, make, model, description, price, miles, highway, city, transmission, engine, header, vin, stockNumber, exterior, interior} = this.props;
        console.log(description)
        await this.props.updateCar(carId, year, make, model, description, price, miles, highway, city, transmission, engine, header, vin, stockNumber, exterior, interior)
        .then(() => {
            alert("car edited")
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    handleUnlist = async (e) => {
        await this.props.unlistCar(this.props.match.params.carId)
        .then(() => {
            this.props.history.push(`/Profile/${this.props.user.userId}`)
        })
    }

    render() {
    const mappedMakes = this.props.makes.map((val, i) => {
        return (
            <option value={val}>{val}</option>
        )
    })
    const mappedCarHeader = this.props.car.map((val, i) => {
        return (
            <div className="manageCarHeader">
                <h1>{val.condition} {val.year} {val.make} {val.model}</h1>
                <img src={val.header}></img>
                <button onClick={this.changeHeaderMenu}>Edit Header</button>
            </div>
        )
    })
    const mappedCarDetails = this.props.car.map((val, i) => {
        return (
            <div className="manageCarDetails">
              <p>Mileage: {val.miles} miles</p>
              <p>Highway: {val.highway}</p>
              <p>City: {val.city}</p>
              <p>Transmission: {val.transmission}</p>
              <p>Engine: {val.engine}</p>
              <p>Vin: {val.vin}</p>
              <p>Stock Number: {val.stockNumber}</p>
              <p>Exterior: {val.exterior}</p>
              <p>Interior: {val.interior}</p>
              <button onClick={this.changeDetailMenu}>Edit Details</button>
            </div>
        )
    })
    const mappedPrice = this.props.car.map((val, i) => {
        return (
            <div className="manageCarPrice">
                <h3>${val.price}</h3>
                <button onClick={this.changePriceMenu}>Edit Price</button>
            </div>
        )
    })
    const mappedDescription = this.props.car.map((val, i) => {
        return (
            <div className="manageCarDescription">
                <p>{val.description}</p>
                <button onClick={this.changeDescriptionMenu}>Edit Description</button>
            </div>
        )
    })
    return (
            <div>
                {mappedCarHeader}
                {mappedCarDetails}
                {mappedPrice}
                {mappedDescription}
                {/* Header menu */}
                <div className={this.state.editMenuHeader}>
                    <input placeholder="Edit Car Year" onChange={this.handleUpdate} name="year"></input>
                    <select onChange={this.handleUpdate} name="make">
                        <option>--Select Make--</option>
                        {mappedMakes}
                    </select>
                    <input placeholder="Edit Car Model" onChange={this.handleUpdate} name="model"></input>
                    <h5>Edit Header Image:</h5>
                    <input type="file"></input>
                    <button onClick={this.changeHeaderMenu}>Cancel</button>
                    <button onClick={this.updateCar}>Update Header Section</button>
                </div>
                {/* Price menu */}
                <div className={this.state.editMenuPrice}>
                    <input placeholder="Edit Car Price" onChange={this.handleUpdate} name="price"></input>
                    <button onClick={this.changePriceMenu}>Cancel</button>
                    <button onClick={this.updateCar}>Update Price Section</button>
                </div>
                {/* Details menu */}
                <div className={this.state.editMenuDetails}>
                    <input placeholder="Edit Car Mileage" onChange={this.handleUpdate} name="miles"></input>
                    <input placeholder="Edit Car Highway MPG" onChange={this.handleUpdate} name="highway"></input>
                    <input placeholder="Edit Car City MPG" onChange={this.handleUpdate} name="city"></input>
                    <input placeholder="Edit Car Transmission" onChange={this.handleUpdate} name="transmission"></input>
                    <input placeholder="Edit Car Engine" onChange={this.handleUpdate} name="engine"></input>
                    <input placeholder="Edit Car Vin" onChange={this.handleUpdate} name="vin"></input>
                    <input placeholder="Edit Car Stock Number" onChange={this.handleUpdate} name="stockNumber"></input>
                    <input placeholder="Edit Car Exterior Color" onChange={this.handleUpdate} name="exterior"></input>
                    <input placeholder="Edit Car Interior Color" onChange={this.handleUpdate} name="interior"></input>
                    <button onClick={this.changeDetailMenu}>Cancel</button>
                    <button onClick={this.updateCar}>Update Details Section</button>
                </div>
                {/* Description menu */}
                <div className={this.state.editMenuDescription}>
                    <input placeholder="Edit Car Description" name="description" onChange={this.handleUpdate}></input>
                    <button onClick={this.changeDescriptionMenu}>Cancel</button>
                    <button onClick={this.updateCar}>Update Description Section</button>
                </div>
                <div>
                    <h5>Need To Unlist This Vehicle?</h5>
                    <button onClick={this.handleUnlist}>Remove Vehicle</button>
                </div>
                <button onClick={this.updateCar}>Submit Updates</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {        
        makes: reduxState.UserCarReducer.makes,
        year: reduxState.UserCarReducer.year,
        make: reduxState.UserCarReducer.make,
        model: reduxState.UserCarReducer.model,
        description: reduxState.UserCarReducer.description,
        price: reduxState.UserCarReducer.price,
        miles: reduxState.UserCarReducer.miles,
        highway: reduxState.UserCarReducer.highway,
        city: reduxState.UserCarReducer.city,
        transmission: reduxState.UserCarReducer.transmission,
        engine: reduxState.UserCarReducer.engine,
        header: reduxState.UserCarReducer.header,
        vin: reduxState.UserCarReducer.vin,
        stockNumber: reduxState.UserCarReducer.stockNumber,
        exterior: reduxState.UserCarReducer.exterior,
        interior: reduxState.UserCarReducer.interior,
        car: reduxState.CarReducer.car,
        makes: reduxState.UserCarReducer.makes,
        user: reduxState.AuthReducer.user
    }
}


export default connect(mapStateToProps, {carDetails, updateState, updateCar, unlistCar})(ManageCar);