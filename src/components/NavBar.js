import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "./NavBar.css";
import LandingSearch from  "./LandingSearch/Landing";
import Login from "./Auth/Login"

class NavBar extends React.Component {
    constructor(){
        super()
    }


    
    render() {
        return (
            <div className="NavBarMain">
                <Link to="/">
                    <h1>CarzSeller</h1>
                </Link>
                {this.props.user.loggedIn === true ?
                    <div className="NavLoggedIn">
                        <Link to={`/Profile/${this.props.user.userId}`}>
                            <h2>{this.props.user.email}</h2>
                        </Link>
                    </div>  : <Link to="/Login">
                                <button>Login</button>
                              </Link>
                }
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        email: reduxState.AuthReducer.email,
        password: reduxState.AuthReducer.password,
        user: reduxState.AuthReducer.user
    }
}

export default connect(mapStateToProps, {})(NavBar);