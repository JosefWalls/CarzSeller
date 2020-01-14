import React from "react";
import {connect} from "react-redux";
import {logIn, updateState} from "../../quakers/reducers/AuthReducer";
import "./Login.css";

class Login extends React.Component{
    constructor(){
        super()


        this.state = {
            error: false
        }
    }

    handleDetails = (e) => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

    loginUser = async (e) => {
        const {email, password} = this.props;
        await this.props.logIn(email, password)
        .then(() => {
            if(this.props.user.loggedIn === true){
                this.props.history.push("/")
            } else {
                this.setState({error: true})
            }
        })
        .catch(() => {
            this.setState({error: true})
    })
    }

    render() {
        return (
            <div className="loginMain">
            <div className="loginCard">
                <input placeholder="Enter email" name="email" onChange={this.handleDetails}></input>
                <input placeholder="Enter password" name="password" onChange={this.handleDetails}></input>
                <button onClick={this.loginUser}>Submit</button>
                {this.state.error === true ? <h1>Incorrect login</h1> : null}
            </div>
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

export default connect(mapStateToProps, {logIn, updateState})(Login);