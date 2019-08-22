import React, { Component } from "react";
import {NavbarPinkEmpty} from "../components/Navbar";
import { Redirect } from 'react-router-dom'
import API from "../utils/API";
import "./style.css";

class Login extends Component {
    state = {
        email : "",
        password : "",
        sendingTo: "",
        errorMsg:"",
        error: false
    };

handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
};


submitLogin = event => {
    event.preventDefault();
    //console.log(this.state.email)
    //console.log(this.state.password)
    var newUser= {
        email: this.state.email.toLowerCase(),
        password: this.state.password
    }
    API.logIn(newUser)
    .then(res=>{
        sessionStorage['token'] = res.data.token
        sessionStorage['spec'] = res.data.user.spec
        sessionStorage['id'] = res.data.user.id
        //console.log(res.data);
        //console.log(sessionStorage)
        //console.log("user spec : " + res.data.user.spec)
        if(res.data.user.spec==="patient") this.setState({ sendingTo: "patient" })
        else if(res.data.user.spec==="doctor") this.setState({sendingTo : "doctor"})
    })
    .catch(err => {
        console.log(err)
        this.setState({ 
            errorMessage: "Something goes wrong",
            error: true,
        })
    })
}

render() {
    if (this.state.sendingTo==="patient"){ return <Redirect to="/patient" />}
    else if (this.state.sendingTo==="doctor"){ return <Redirect to="/doctor" />}
    return (
        <div className="generalBOXpink">
            <NavbarPinkEmpty/>
            <div className="row">
                <div className="col d-flex justify-content-center bg-light pt-3">
                    <h3> Email: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="email" value={this.state.email} onChange={this.handleInputChange} name="email" placeholder="johnsmith@exp.com"/>
                </div>     
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center bg-light">
                    <h3> Password: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 d-inline-flex align-self-center bg-light p-3">
                    <input className="form-control" type="password" value={this.state.password} onChange={this.handleInputChange} name="password" placeholder="*****"/>
                </div>
            </div>

            <div className="row">
                <div className="col d-flex justify-content-center bg-light p-3">
                    <button onClick={this.submitLogin} style={{ marginBottom: 10 }} className="btn btn-info">
                        Submit
                    </button> 
                </div>
            </div> 
        </div>
    );
}
};

export default Login;