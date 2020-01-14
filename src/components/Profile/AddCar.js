import React from "react";
import {connect} from "react-redux";
import {updateState, addcar} from "../../quakers/reducers/UserCarReducer";
import {storage} from "../../../firebase-config";
import "./Addcar.css";
import {Link} from "react-router-dom";

class AddCar extends React.Component {
    constructor(){
        super()
    }


    handleDetails = (e) => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

    handleMake = async (e) => { 
        await this.props.updateState({make: e.target.value})
    }

    uploadHeader = (e) => {
        if(e.target.files[0]){
            const image = (e.target.files[0]);
            const uploadTask = storage.ref(`/cars/${image.name}`).put(image)
            uploadTask.on("state_changed",
            () => {
                storage.ref('cars').child(image.name).getDownloadURL()
                .then(url => {
                    console.log(url)
                    this.props.updateState({header: url})
                })
            }
            )
        }
    }

    submitCar = async (e) => {
        e.preventDefault();
        const {year, make, model, description, price, miles, highway, city, transmission, engine, header, vin, stockNumber, exterior, interior} = this.props;
        if(!header){
            this.props.updateState({header: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEUAAP+KeNJXAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"})
        }

        await this.props.addcar(year, make, model, description, price, miles, highway, city, transmission, engine, header, vin, stockNumber, exterior, interior)
        .then(() => {
            this.props.history.push(`/Profile/${this.props.user.userId}`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const mappedMakes = this.props.makes.map((val, i) => {
            return (
                <option value={val}>{val}</option>
            )
        })
        return (
            <section className="addCarMain">
            <div className="addCarForm">
                <input name="year" placeholder="Year" onChange={this.handleDetails}></input>
                <select onChange={this.handleMake}>
                    <option>--Select Make--</option>
                    {mappedMakes}
                </select>
                <input name="model" placeholder="Model" onChange={this.handleDetails}></input>
                <input name="description" placeholder="Description" onChange={this.handleDetails}></input>
                <input name="miles" placeholder="Miles" onChange={this.handleDetails}></input>
                <input name="highway" placeholder="Highway" onChange={this.handleDetails}></input>
                <input name="city" placeholder="City" onChange={this.handleDetails}></input>
                <input name="transmission" placeholder="Transmission" onChange={this.handleDetails}></input>
                <input name="engine" placeholder="Engine" onChange={this.handleDetails}></input>
                <input name="header" type="file" onChange={this.uploadHeader}></input>
                <input name="vin" placeholder="Vin" onChange={this.handleDetails}></input>
                <input name="stockNumber" placeholder="Stock Number" onChange={this.handleDetails}></input>
                <input name="exterior" placeholder="Exterior Color" onChange={this.handleDetails}></input>
                <input name="interior" placeholder="Interior Color" onChange={this.handleDetails}></input>
                <input name="price" placeholder="Price" onChange={this.handleDetails}></input>
                <button onClick={this.submitCar} className="cancelButton">Add Vehicle</button>
                <Link to={`/Profile/${this.props.user.userId}`}>
                    <button className="cancelButton">Cancel</button>
                </Link>
            </div>
            </section>
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
        user: reduxState.AuthReducer.user
    }
}

export default connect(mapStateToProps, {updateState, addcar})(AddCar);