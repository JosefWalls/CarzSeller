import React from  "react";
import "./Landing.css";
import {connect} from "react-redux";
import {filterMakes, filterModels, updateState} from "../../quakers/reducers/CarReducer";
import {Link} from "react-router-dom";

class Landing extends React.Component {
    constructor(){
        super()

        this.state = {
            make: "",
            model: ""
        }
    }

    componentDidMount(){
     this.props.filterMakes();
    }

    handleMake = async (e) => {
        this.props.updateState({make: e.target.value})
        await this.props.filterModels(e.target.value)
    }

    handleModel = async (e) => {
        this.props.updateState({model: e.target.value})
        await this.setState({model: e.target.value})
    }

    render() {
        const mappedMakes = this.props.makes.map((val, i) => {
            return (
                <option value={val}>{val}</option>
            )
        })
        const mappedModels = this.props.models.map((val, i) => {
            return (
                <option value={val}>{val}</option>
            )
        })
        return (
            <div className="landingSort">
                <img src="https://drop.ndtv.com/albums/AUTO/porsche-taycan-turbo/6401200x900_1_640x480.jpg"></img>
                <div className="landingSortCard">
                    <h4>Search Carz!</h4>
                    <select onChange={this.handleMake}>
                        <option>--Select Make--</option>
                        {mappedMakes}
                    </select>
                    <select onChange={this.handleModel}>
                        <option>--Select Model--</option>
                        {mappedModels}
                    </select>
                    <Link to={`/Search/`}>
                        <button>Search</button>
                    </Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return {
        make: reduxState.CarReducer.make,
        model: reduxState.CarReducer.model,
        makes: reduxState.CarReducer.makes,
        models: reduxState.CarReducer.models
    }
}

export default connect(mapStateToProps, {filterMakes, filterModels, updateState})(Landing);